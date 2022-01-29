import {
  ConnectionConfig,
  Exec,
  ExecNoDb,
  Query,
  QueryOne,
  QueryTuples,
  SQLError,
} from "@/data/client";
import { ScaleFactor, ScaleFactors } from "@/data/recoil";
import { PROCEDURES, SEED_DATA, TABLES } from "@/data/sql";

export const connectionState = async (config: ConnectionConfig) => {
  try {
    return {
      connected: true,
      initialized: await hasSchema(config),
    };
  } catch (e) {
    return { connected: false };
  }
};

export const hasSchema = async (config: ConnectionConfig) => {
  try {
    const tables = (await QueryTuples(config, "SHOW TABLES"))
      .map((r) => r[0])
      .sort();
    const procedures = (await QueryTuples(config, "SHOW PROCEDURES"))
      .map((r) => r[0])
      .sort();

    return (
      TABLES.every(({ name }) => tables.includes(name)) &&
      PROCEDURES.every(({ name }) => procedures.includes(name))
    );
  } catch (e) {
    if (e instanceof SQLError && e.isUnknownDatabase()) {
      return false;
    }
    throw e;
  }
};

// TODO: support skipping drop database
export const resetSchema = async (
  config: ConnectionConfig,
  progress: (msg: string, status: "info" | "success") => void
) => {
  progress("Dropping existing schema", "info");
  await ExecNoDb(config, "DROP DATABASE IF EXISTS `" + config.database + "`");

  progress("Creating database", "info");
  await ExecNoDb(config, "CREATE DATABASE `" + config.database + "`");

  for (const obj of TABLES) {
    progress(`Creating table: ${obj.name}`, "info");
    await Exec(config, obj.createStmt);
  }
  for (const obj of PROCEDURES) {
    progress(`Creating procedure: ${obj.name}`, "info");
    await Exec(config, obj.createStmt);
  }
  for (const q of SEED_DATA) {
    await Exec(config, q);
  }

  progress("Schema initialized", "success");
};

export const ensurePipelinesExist = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  type Row = {
    cityId: number;
    cityName: string;
    pipelineName: string;
    lon: number;
    lat: number;
    diameter: number;
  };

  const pipelines = await Query<Row>(
    config,
    `
      SELECT
        expected.city_id AS cityId,
        expected.city_name AS cityName,
        pipelineName,
        GEOGRAPHY_LONGITUDE(expected.centroid) AS lon,
        GEOGRAPHY_LATITUDE(expected.centroid) AS lat,
        expected.diameter
      FROM (
        SELECT cities.*, CONCAT(prefix.table_col, cities.city_id) AS pipelineName
        FROM s2cellular.cities
        JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
      ) AS expected
      LEFT JOIN information_schema.pipelines
        ON pipelines.database_name = ?
        AND pipelines.pipeline_name = expected.pipelineName
      WHERE
        pipelines.pipeline_name IS NULL
        OR config_json::$connection_string NOT LIKE "%${scaleFactor}%"
    `,
    config.database || "s2cellular"
  );

  await Promise.all(
    pipelines.map((city) => {
      console.log(
        `recreating pipeline ${city.pipelineName} for city ${city.cityName}`
      );

      if (city.pipelineName.startsWith("locations_")) {
        return Exec(
          config,
          `
            CREATE OR REPLACE PIPELINE ${city.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${scaleFactor}/locations.*'
            INTO PROCEDURE process_locations FORMAT PARQUET (
              subscriber_id <- subscriberid,
              @offset_x <- offsetX,
              @offset_y <- offsetY
            )
            SET
              city_id = ?,
              lonlat = GEOGRAPHY_POINT(
                ? + (@offset_x * ?),
                ? + (@offset_y * ?)
              );
          `,
          city.cityId,
          city.lon,
          city.diameter,
          city.lat,
          city.diameter
        );
      } else if (city.pipelineName.startsWith("requests_")) {
        return Exec(
          config,
          `
            CREATE OR REPLACE PIPELINE ${city.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${scaleFactor}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,
          city.cityId
        );
      } else if (city.pipelineName.startsWith("purchases_")) {
        return Exec(
          config,
          `
            CREATE OR REPLACE PIPELINE ${city.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${scaleFactor}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,
          city.cityId
        );
      }
    })
  );
};

export const ensurePipelinesAreRunning = async (config: ConnectionConfig) => {
  const pipelines = await QueryTuples(
    config,
    `
      SELECT
        pipelines.pipeline_name,
        state,
        SUM(file_state = "Loaded"):>int AS num_loaded,
        COUNT(*) AS num_total
      FROM
        information_schema.pipelines_files,
        information_schema.pipelines
      WHERE
        pipelines_files.pipeline_name = pipelines.pipeline_name
        AND pipelines_files.database_name = pipelines.database_name
        AND pipelines.database_name = ?
      GROUP BY pipelines.pipeline_name
      HAVING num_loaded = num_total OR state != "Running"
    `,
    config.database || "s2cellular"
  );

  await Promise.all(
    pipelines.map(async ([name]) => {
      console.log("restarting pipeline", name);
      await Exec(config, `ALTER PIPELINE ${name} SET OFFSETS EARLIEST`);
      await Exec(config, `START PIPELINE IF NOT RUNNING ${name}`);
    })
  );
};

export const truncateTimeseriesTables = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  const { maxRows } = ScaleFactors[scaleFactor];
  const oversizedTables = await Query<{ name: string; count: number }>(
    config,
    `
      SELECT
        table_name AS name,
        SUM(rows) AS count
      FROM information_schema.table_statistics
      WHERE
        database_name = ?
        AND table_name IN ("locations", "requests", "purchases", "notifications")
      GROUP BY table_name
      HAVING count > ${maxRows}
    `,
    config.database || "s2cellular"
  );

  await Promise.all(
    oversizedTables.map(async ({ name, count }) => {
      const delta = count - maxRows;

      // only run delete if we are going to delete at least 20% of the data
      if (delta < maxRows * 0.2) {
        return;
      }

      const { ts } = await QueryOne<{ ts: string }>(
        config,
        `
        SELECT
          MAX(ts) AS ts
        FROM (
          SELECT * FROM ${name}
          ORDER BY ts ASC
          LIMIT ${delta}
        )
      `
      );

      console.log(`removing ${delta} rows from ${name} (up to ${ts})`);
      await Exec(config, `DELETE FROM ${name} WHERE ts <= ?`, ts);
    })
  );
};

export const runMatchingProcess = (config: ConnectionConfig) =>
  Exec(config, `CALL run_matching_process()`);

export type NotificationTuple = [
  ts: string,
  offer_id: number,
  lon: number,
  lat: number
];

export const queryNotifications = (
  config: ConnectionConfig,
  since: string,
  limit: number
) =>
  QueryTuples<NotificationTuple>(
    config,
    `
      SELECT
        LAST(ts) AS ts,
        LAST(offer_id) AS offer_id,
        GEOGRAPHY_LONGITUDE(LAST(lonlat)) AS lon,
        GEOGRAPHY_LATITUDE(LAST(lonlat)) AS lat
      FROM notifications
      WHERE ts > ?
      GROUP BY city_id, subscriber_id
      ORDER BY ts DESC
      LIMIT ${limit}
    `,
    since
  );
