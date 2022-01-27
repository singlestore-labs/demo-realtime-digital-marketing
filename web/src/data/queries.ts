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

type City = {
  id: number;
  name: string;
  lon: number;
  lat: number;
  diameter: number;
};

export const getCities = (config: ConnectionConfig) =>
  Query<City>(
    config,
    `
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LONGITUDE(centroid) AS lon,
        GEOGRAPHY_LATITUDE(centroid) AS lat,
        diameter
      FROM cities
    `
  );

export const createPipelinesForCity = async (
  config: ConnectionConfig,
  city: City,
  size: ScaleFactor
) => {
  const pipelines = await Query<{ name: string; connection: string }>(
    config,
    `
      SELECT
        pipeline_name AS name,
        config_json::$connection_string AS connection
      FROM information_schema.pipelines
      WHERE database_name = ?
    `,
    config.database || "s2cellular"
  );

  const needsUpdate = (pipelineName: string) => {
    const pipeline = pipelines.find(({ name }) => name === pipelineName);
    if (!pipeline) {
      return true;
    }
    return !pipeline.connection.includes(size);
  };

  const promises = [];

  if (needsUpdate(`locations_${city.id}`)) {
    console.log("creating locations pipeline for city", city.name);
    promises.push(
      Exec(
        config,
        `
          CREATE OR REPLACE PIPELINE locations_${city.id}
          AS LOAD DATA LINK aws_s3 's2cellular/${size}/locations.*'
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
        city.id,
        city.lon,
        city.diameter,
        city.lat,
        city.diameter
      )
    );
  }

  if (needsUpdate(`requests_${city.id}`)) {
    console.log("creating requests pipeline for city", city.name);
    promises.push(
      Exec(
        config,
        `
          CREATE OR REPLACE PIPELINE requests_${city.id}
          AS LOAD DATA LINK aws_s3 's2cellular/${size}/requests.*'
          INTO TABLE requests FORMAT PARQUET (
            subscriber_id <- subscriberid,
            domain <- domain
          )
          SET ts = NOW(),
            city_id = ?;
        `,
        city.id
      )
    );
  }

  if (needsUpdate(`purchases_${city.id}`)) {
    console.log("creating purchases pipeline for city", city.name);
    promises.push(
      Exec(
        config,
        `
          CREATE OR REPLACE PIPELINE purchases_${city.id}
          AS LOAD DATA LINK aws_s3 's2cellular/${size}/purchases.*'
          INTO TABLE purchases FORMAT PARQUET (
            subscriber_id <- subscriberid,
            vendor <- vendor
          )
          SET ts = NOW(),
            city_id = ?;
        `,
        city.id
      )
    );
  }

  await Promise.all(promises);
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

export const truncateTableIfNeeded = async (
  config: ConnectionConfig,
  tableName: string,
  scaleFactor: ScaleFactor
) => {
  const { maxRows } = ScaleFactors[scaleFactor];
  const { count } = await QueryOne<{ count: number }>(
    config,
    `SELECT COUNT(*) AS count FROM ${tableName}`
  );
  if (count > maxRows) {
    const delta = count - maxRows;
    const { ts } = await QueryOne<{ ts: string }>(
      config,
      `
        SELECT
          MAX(ts) AS ts
        FROM (
          SELECT * FROM ${tableName}
          ORDER BY ts ASC
          LIMIT ${delta}
        )
      `
    );

    console.log(`removing ${delta} rows from ${tableName} (up to ${ts})`);
    await Exec(
      config,
      `
        DELETE FROM ${tableName}
        WHERE ts <= ?
      `,
      ts
    );
  }
};

export const runMatchingProcess = (config: ConnectionConfig) =>
  Exec(config, `CALL run_matching_process()`);
