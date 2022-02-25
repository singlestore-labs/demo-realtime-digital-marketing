import {
  ConnectionConfig,
  Exec,
  ExecNoDb,
  Query,
  QueryNoDb,
  QueryOne,
  QueryTuples,
  SQLError,
} from "@/data/client";
import {
  BASE_DATA,
  FUNCTIONS,
  PROCEDURES,
  SEED_DATA,
  TABLES,
} from "@/data/sql";
import { boundsToWKTPolygon } from "@/geo";
import { ScaleFactor, ScaleFactors } from "@/scalefactors";
import { Bounds } from "pigeon-maps";
import stringHash from "string-hash";

export const isConnected = async (config: ConnectionConfig) => {
  try {
    await ExecNoDb(config, "SELECT 1");
    return true;
  } catch (e) {
    return false;
  }
};

export const hasSchema = async (config: ConnectionConfig) => {
  const objects = await schemaObjects(config);
  return Object.values(objects).every((x) => x);
};

type schemaObjInfo = {
  tables: string[];
  procedures: string[];
  functions: string[];
};

export const schemaObjects = async (
  config: ConnectionConfig
): Promise<{ [key: string]: boolean }> => {
  let objs: schemaObjInfo = { tables: [], procedures: [], functions: [] };
  const { database, ...configNoDb } = config;

  try {
    objs = (
      await QueryTuples<[keyof schemaObjInfo, string]>(
        configNoDb,
        `
          SELECT "tables", table_name
          FROM information_schema.tables
          WHERE table_schema = ?
          UNION ALL
          SELECT (
            CASE routine_type
              WHEN 'PROCEDURE' THEN 'procedures'
              WHEN 'FUNCTION' THEN 'functions'
            END
          ), routine_name
          FROM information_schema.routines
          WHERE routine_schema = ?
        `,
        database || "s2cellular",
        database || "s2cellular"
      )
    ).reduce((acc, [type, name]) => {
      acc[type].push(name);
      return acc;
    }, objs);
  } catch (e) {
    if (
      !(
        e instanceof SQLError &&
        (e.isUnknownDatabase() || e.isDatabaseRecovering())
      )
    ) {
      throw e;
    }
  }

  const { tables, procedures, functions } = objs;

  return Object.fromEntries(
    [
      TABLES.map(({ name }) => [name, tables.includes(name)]),
      PROCEDURES.map(({ name }) => [name, procedures.includes(name)]),
      FUNCTIONS.map(({ name }) => [name, functions.includes(name)]),
    ].flat()
  );
};

export const resetSchema = async (
  config: ConnectionConfig,
  progress: (msg: string, status: "info" | "success") => void,
  includeSeedData = true
) => {
  progress("Dropping existing schema", "info");
  await ExecNoDb(config, "DROP DATABASE IF EXISTS `" + config.database + "`");

  progress("Creating database", "info");
  await ExecNoDb(config, "CREATE DATABASE `" + config.database + "`");

  for (const obj of FUNCTIONS) {
    progress(`Creating function: ${obj.name}`, "info");
    await Exec(config, obj.createStmt);
  }
  for (const obj of TABLES) {
    progress(`Creating table: ${obj.name}`, "info");
    await Exec(config, obj.createStmt);
  }
  for (const obj of PROCEDURES) {
    progress(`Creating procedure: ${obj.name}`, "info");
    await Exec(config, obj.createStmt);
  }

  await insertBaseData(config);

  if (includeSeedData) {
    progress("Creating sample data", "info");
    await insertSeedData(config);
  }

  progress("Schema initialized", "success");
};

export const insertBaseData = (config: ConnectionConfig) =>
  Promise.all(BASE_DATA.map((q) => Exec(config, q)));

export const insertSeedData = (config: ConnectionConfig) =>
  Promise.all(SEED_DATA.map((q) => Exec(config, q)));

export type SegmentConfig = {
  kind: "olc_8" | "olc_6" | "purchase" | "request";
  interval: "minute" | "hour" | "day" | "week" | "month";
  value: string;
};

export type OfferConfig = {
  bidCents: number;
  message: string;
  zone: string;
  segments: SegmentConfig[];
};

export const createOffers = async (
  config: ConnectionConfig,
  offers: OfferConfig[]
) => {
  const seenSegments = new Set();
  const segments = offers.flatMap(({ segments }) =>
    segments
      .map((s) => ({
        id: stringHash(`${s.interval}-${s.kind}-${s.value}`),
        segment: s,
      }))
      .filter((s) => (seenSegments.has(s.id) ? false : seenSegments.add(s.id)))
  );

  // TODO: create all the segments and offers in two multi-inserts
  // then switch insertSeedData to use this instead of the SEED_OFFERS global
  await Exec(
    config,
    `
    REPLACE INTO segments
  `
  );

  return 1;
};

export const pipelineStatus = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  const scaleFactorPrefix = ScaleFactors[scaleFactor].prefix;
  type Row = {
    cityId: number;
    cityName: string;
    lon: number;
    lat: number;
    diameter: number;
    pipelineName: string;
    needsUpdate: boolean;
  };

  return await Query<Row>(
    config,
    `
      SELECT
        expected.city_id AS cityId,
        expected.city_name AS cityName,
        GEOGRAPHY_LONGITUDE(expected.centroid) AS lon,
        GEOGRAPHY_LATITUDE(expected.centroid) AS lat,
        expected.diameter,
        pipelineName,
        (
          pipelines.pipeline_name IS NULL
          OR config_json::$connection_string NOT LIKE "%${scaleFactorPrefix}%"
        ) AS needsUpdate
      FROM (
        SELECT cities.*, CONCAT(prefix.table_col, cities.city_id) AS pipelineName
        FROM s2cellular.cities
        JOIN TABLE(["locations_", "requests_", "purchases_"]) AS prefix
      ) AS expected
      LEFT JOIN information_schema.pipelines
        ON pipelines.database_name = ?
        AND pipelines.pipeline_name = expected.pipelineName
    `,
    config.database || "s2cellular"
  );
};

export const ensurePipelinesExist = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  const scaleFactorPrefix = ScaleFactors[scaleFactor].prefix;
  const pipelines = await pipelineStatus(config, scaleFactor);

  await Promise.all(
    pipelines
      .filter((p) => p.needsUpdate)
      .map(async (pipeline) => {
        console.log(
          `recreating pipeline ${pipeline.pipelineName} for city ${pipeline.cityName}`
        );

        if (pipeline.pipelineName.startsWith("locations_")) {
          await Exec(
            config,
            `
            CREATE OR REPLACE PIPELINE ${pipeline.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${scaleFactorPrefix}/locations.*'
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
              )
          `,
            pipeline.cityId,
            pipeline.lon,
            pipeline.diameter,
            pipeline.lat,
            pipeline.diameter
          );
        } else if (pipeline.pipelineName.startsWith("requests_")) {
          await Exec(
            config,
            `
            CREATE OR REPLACE PIPELINE ${pipeline.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${scaleFactorPrefix}/requests.*'
            INTO TABLE requests FORMAT PARQUET (
              subscriber_id <- subscriberid,
              domain <- domain
            )
            SET ts = NOW(),
              city_id = ?;
          `,
            pipeline.cityId
          );
        } else if (pipeline.pipelineName.startsWith("purchases_")) {
          await Exec(
            config,
            `
            CREATE OR REPLACE PIPELINE ${pipeline.pipelineName}
            AS LOAD DATA LINK aws_s3 's2cellular/${scaleFactorPrefix}/purchases.*'
            INTO TABLE purchases FORMAT PARQUET (
              subscriber_id <- subscriberid,
              vendor <- vendor
            )
            SET ts = NOW(),
              city_id = ?;
          `,
            pipeline.cityId
          );
        }

        await Exec(
          config,
          `ALTER PIPELINE ${pipeline.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`
        );
        await Exec(
          config,
          `START PIPELINE IF NOT RUNNING ${pipeline.pipelineName}`
        );

        console.log(
          `finished creating pipeline ${pipeline.pipelineName} for city ${pipeline.cityName}`
        );
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
      await Exec(
        config,
        `ALTER PIPELINE ${name} SET OFFSETS EARLIEST DROP ORPHAN FILES`
      );
      await Exec(config, `START PIPELINE IF NOT RUNNING ${name}`);
    })
  );
};

// returns true if any plans were dropped
export const checkPlans = async (config: ConnectionConfig) => {
  const badPlans = await Query<{ planId: string }>(
    config,
    `
      SELECT plan_id AS planId
      FROM information_schema.plancache
      WHERE
        plan_warnings LIKE "%empty tables%"
    `
  );

  await Promise.all(
    badPlans.map(({ planId }) => Exec(config, `DROP ${planId} FROM PLANCACHE`))
  );

  return badPlans.length > 0;
};

/*
// We only need to count the metrics from the agreggators. The rows will always
// pass through an aggregator, so a row will be counted once in the leaf and
// once in the aggregator.
export const SQL_CLUSTER_THROUGHPUT = `
    SELECT 
        VARIABLE_NAME AS variableName, 
        SUM(cast(VARIABLE_VALUE as UNSIGNED)) AS variableValue, 
        NOW(6) AS readTime
    FROM
        INFORMATION_SCHEMA.MV_GLOBAL_STATUS 
    WHERE 
        (
            variable_name = 'Rows_affected_by_writes' OR
            variable_name = 'Rows_returned_by_reads'
        ) AND 
        (
            NODE_TYPE = 'MA' OR
            NODE_TYPE = 'CA'
        )
    GROUP BY
        VARIABLE_NAME;
`;

*/

export const estimatedRowCount = <TableName extends string>(
  config: ConnectionConfig,
  ...tables: TableName[]
) => {
  const tablesSQL = tables.map((name) => `"${name}"`).join(",");

  return QueryNoDb<{ tableName: TableName; count: number }>(
    config,
    `
      SELECT tableName, MAX(count) :> BIGINT AS count
      FROM (
        SELECT
          table_name AS tableName,
          SUM(rows) AS count
        FROM information_schema.table_statistics
        WHERE
          database_name = ?
          AND partition_type IN ("Master", "Reference")
          AND table_name IN (${tablesSQL})
        GROUP BY table_name
        UNION ALL
        SELECT table_col AS tableName, 0 AS count
        FROM TABLE([${tablesSQL}])
      )
      GROUP BY tableName
    `,
    config.database || "s2cellular"
  );
};

export const estimatedRowCountObj = <TableName extends string>(
  config: ConnectionConfig,
  ...tables: TableName[]
) =>
  estimatedRowCount(config, ...tables).then((rows) =>
    rows.reduce((acc, { tableName, count }) => {
      acc[tableName] = count;
      return acc;
    }, {} as { [name in TableName]: number })
  );

export const truncateTimeseriesTables = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  const { maxRows } = ScaleFactors[scaleFactor];
  const tableCounts = await estimatedRowCount(
    config,
    "locations",
    "requests",
    "purchases",
    "notifications"
  );
  const oversizedTables = tableCounts.filter((table) => table.count > maxRows);

  await Promise.all(
    oversizedTables.map(async ({ tableName, count }) => {
      const delta = count - maxRows;

      const { ts, cumulative_count } = await QueryOne<{
        ts: string | null;
        cumulative_count: number | null;
      }>(
        config,
        `
          SELECT
            LAST(ts, ts) :> DATETIME(6) AS ts,
            LAST(cumulative_count, ts) :> BIGINT AS cumulative_count
          FROM (
            SELECT
              MAX(max_value) OVER w AS ts,
              SUM(rows_count - deleted_rows_count) OVER w AS cumulative_count
            FROM
              information_schema.columnar_segments s,
              information_schema.distributed_partitions p
            WHERE
              s.node_id = p.node_id
              AND s.partition = p.ordinal
              AND p.role = "Master"
              AND s.database_name = ?
              AND s.table_name = ?
              AND s.column_name = "ts"
            WINDOW w AS (
              PARTITION BY s.database_name, s.table_name, s.column_name
              ORDER BY min_value ASC
              RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            )
          )
          WHERE cumulative_count <= ${delta}
        `,
        config.database || "s2cellular",
        tableName
      );

      if (ts !== null) {
        console.log(
          `removing ${cumulative_count} rows from ${tableName} older than ${ts}`
        );
        await Exec(config, `DELETE FROM ${tableName} WHERE ts <= ?`, ts);
      }
    })
  );
};

export type SQLIntervals =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month";

// returns number of notifications sent
export const runMatchingProcess = (
  config: ConnectionConfig,
  interval: SQLIntervals = "minute"
) =>
  QueryOne<{ RESULT: number }>(
    config,
    "ECHO run_matching_process(?)",
    interval
  ).then((x) => x.RESULT);

// returns total number of segments after update
export const runUpdateSegments = (config: ConnectionConfig) =>
  QueryOne<{ RESULT: number }>(config, "ECHO update_segments()").then(
    (x) => x.RESULT
  );

export type NotificationTuple = [
  ts: string,
  offer_id: number,
  lon: number,
  lat: number
];

export const queryNotificationsInBounds = (
  config: ConnectionConfig,
  since: string,
  limit: number,
  bounds: Bounds
) =>
  QueryTuples<NotificationTuple>(
    config,
    `
      SELECT
        ts,
        offer_id,
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE
        ts > ?
        AND GEOGRAPHY_CONTAINS(?, lonlat)
      ORDER BY ts ASC
      LIMIT ${limit}
    `,
    since,
    boundsToWKTPolygon(bounds)
  );

export type Offer = {
  offerId: number;
  notificationZone: string;
};

export const queryOffersInBounds = (
  config: ConnectionConfig,
  limit: number,
  bounds: Bounds
) =>
  Query<Offer>(
    config,
    `
      SELECT
        offer_id AS offerId,
        notification_zone AS notificationZone
      FROM offers
      WHERE GEOGRAPHY_INTERSECTS(?, notification_zone)
      LIMIT ${limit}
    `,
    boundsToWKTPolygon(bounds)
  );
