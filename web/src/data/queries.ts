import {
  ConnectionConfig,
  ConnectionConfigOptionalDatabase,
  Exec,
  ExecNoDb,
  Query,
  QueryNoDb,
  QueryOne,
  QueryTuples,
  SQLError,
} from "@/data/client";
import {
  CityConfig,
  createCity,
  createOffers,
  DEFAULT_CITY,
  randomOffers,
} from "@/data/offers";
import { FUNCTIONS, PROCEDURES, S3_BUCKET_NAME, TABLES } from "@/data/sql";
import { compileWithStatement } from "@/data/sqlgen";
import { boundsToWKTPolygon } from "@/geo";
import { ScaleFactor } from "@/scalefactors";
import { Bounds } from "pigeon-maps";
import dedent from "ts-dedent";

export const isConnected = async (config: ConnectionConfigOptionalDatabase) => {
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
        database,
        database
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

export const countPartitions = async (
  config: ConnectionConfig
): Promise<number> =>
  QueryOne<{ count: number }>(
    config,
    `
      SELECT COUNT(*) AS count
      FROM information_schema.distributed_partitions
      WHERE
        database_name = ?
        AND role = "Master"
    `,
    config.database
  ).then((x) => x.count);

export const dropDatabase = (config: ConnectionConfig) =>
  ExecNoDb(config, "DROP DATABASE IF EXISTS `" + config.database + "`");

export const resetSchema = async (
  config: ConnectionConfig,
  {
    progress,
    scaleFactor,
    includeSeedData,
    resetDataOnly = false,
  }: {
    progress: (msg: string, status: "info" | "success") => void;
    scaleFactor: ScaleFactor;
    includeSeedData: boolean;
    resetDataOnly: boolean;
  }
) => {
  if (!resetDataOnly) {
    progress("Dropping existing schema", "info");
    await dropDatabase(config);

    progress("Creating database", "info");
    await ExecNoDb(config, "CREATE DATABASE `" + config.database + "`");
  }

  if (resetDataOnly) {
    progress("Resetting data", "info");
    await dropPipelines(config);
    await truncateData(config);
  }

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

  progress(`Initializing reference data`, "info");
  await insertBaseData(config);
  await createCity(config, DEFAULT_CITY);

  if (includeSeedData) {
    progress("Creating sample data", "info");
    await insertSeedData(config, DEFAULT_CITY, scaleFactor);
  }

  progress("Schema initialized", "success");
};

export const insertBaseData = async (config: ConnectionConfig) => {
  const hasLink = await QueryOne<{ c: number }>(
    config,
    `
      select count(*) as c from information_schema.links
      where database_name = ? and link = "aws_s3"
    `,
    config.database
  );
  if (hasLink.c === 0) {
    await Exec(
      config,
      `CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`
    );
  }

  await Exec(
    config,
    `
      CREATE OR REPLACE PIPELINE worldcities
      AS LOAD DATA LINK aws_s3 '${S3_BUCKET_NAME}/cities.ndjson'
      SKIP DUPLICATE KEY ERRORS
      INTO TABLE worldcities
      FORMAT JSON (
        city_id <- id,
        city_name <- name,
        @lat <- lat,
        @lng <- lng
      )
      SET center = GEOGRAPHY_POINT(@lng, @lat)
    `
  );
  await Exec(config, `START PIPELINE IF NOT RUNNING worldcities`);
};

export const insertSeedData = (
  config: ConnectionConfig,
  city: CityConfig,
  scaleFactor: ScaleFactor
) => {
  const numOffers = 100 * scaleFactor.partitions;
  const offers = randomOffers(city, numOffers);
  return createOffers(config, offers);
};

export type SegmentConfig = {
  kind: "olc_8" | "purchase" | "request";
  interval: "minute" | "hour" | "day" | "week" | "month";
  value: string;
};

export type PipelineName = "locations" | "requests" | "purchases";
export const pipelineNames: PipelineName[] = [
  "locations",
  "requests",
  "purchases",
];

export const pipelineStatus = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  const scaleFactorPrefix = scaleFactor.prefix;

  type Row = {
    pipelineName: string;
    needsUpdate: boolean;
  };

  const status = await Query<Row>(
    config,
    `
      SELECT
        pipeline_name AS pipelineName,
        (config_json::$connection_string NOT LIKE "%${scaleFactorPrefix}%") AS needsUpdate
      FROM information_schema.pipelines
      WHERE
        pipelines.database_name = ?
        AND pipelines.pipeline_name IN (?, ?, ?)
    `,
    config.database,
    ...pipelineNames
  );

  return pipelineNames.map((pipelineName) => {
    const row = status.find((x) => x.pipelineName === pipelineName);
    return {
      pipelineName,
      needsUpdate: row?.needsUpdate ?? true,
    };
  });
};

export const truncateData = (config: ConnectionConfig) =>
  Promise.all([
    Exec(config, "TRUNCATE TABLE cities"),
    Exec(config, "TRUNCATE TABLE locations"),
    Exec(config, "TRUNCATE TABLE notifications"),
    Exec(config, "TRUNCATE TABLE offers"),
    Exec(config, "TRUNCATE TABLE purchases"),
    Exec(config, "TRUNCATE TABLE requests"),
    Exec(config, "TRUNCATE TABLE segments"),
    Exec(config, "TRUNCATE TABLE sessions"),
    Exec(config, "TRUNCATE TABLE subscriber_segments"),
    Exec(config, "TRUNCATE TABLE subscribers"),
    Exec(config, "TRUNCATE TABLE subscribers_last_notification"),
  ]);

export const getPipelineSQL = (
  name: PipelineName,
  scaleFactor: ScaleFactor
) => {
  switch (name) {
    case "locations":
      return dedent`
        CREATE OR REPLACE PIPELINE ${name}
        AS LOAD DATA LINK aws_s3 '${S3_BUCKET_NAME}/${scaleFactor.prefix}/locations.*'
        MAX_PARTITIONS_PER_BATCH ${scaleFactor.partitions}
        INTO PROCEDURE process_locations FORMAT PARQUET (
          subscriber_id <- subscriberid,
          offset_x <- offsetX,
          offset_y <- offsetY
        )
      `;
    case "requests":
      return dedent`
        CREATE OR REPLACE PIPELINE ${name}
        AS LOAD DATA LINK aws_s3 '${S3_BUCKET_NAME}/${scaleFactor.prefix}/requests.*'
        MAX_PARTITIONS_PER_BATCH ${scaleFactor.partitions}
        INTO PROCEDURE process_requests FORMAT PARQUET (
          subscriber_id <- subscriberid,
          domain <- domain
        )
      `;
    case "purchases":
      return dedent`
        CREATE OR REPLACE PIPELINE ${name}
        AS LOAD DATA LINK aws_s3 '${S3_BUCKET_NAME}/${scaleFactor.prefix}/purchases.*'
        MAX_PARTITIONS_PER_BATCH ${scaleFactor.partitions}
        INTO PROCEDURE process_purchases FORMAT PARQUET (
          subscriber_id <- subscriberid,
          vendor <- vendor
        )
      `;
  }
};

export const dropPipelines = async (config: ConnectionConfig) =>
  await Promise.all(
    pipelineNames.map((pipeline) =>
      Exec(config, `DROP PIPELINE IF EXISTS ${pipeline}`)
    )
  );

export const ensurePipelinesExist = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  const pipelines = await pipelineStatus(config, scaleFactor);

  await Promise.all(
    pipelines
      .filter((p) => p.needsUpdate)
      .map(async (pipeline) => {
        console.log(`recreating pipeline ${pipeline.pipelineName}`);

        await Exec(config, getPipelineSQL(pipeline.pipelineName, scaleFactor));

        await Exec(
          config,
          `ALTER PIPELINE ${pipeline.pipelineName} SET OFFSETS EARLIEST DROP ORPHAN FILES`
        );

        await Exec(
          config,
          `START PIPELINE IF NOT RUNNING ${pipeline.pipelineName}`
        );

        console.log(`finished creating pipeline ${pipeline.pipelineName}`);
      })
  );
};

export const ensurePipelinesAreRunning = async (config: ConnectionConfig) => {
  const pipelines = await QueryTuples(
    config,
    `
      SELECT
        pipelines.pipeline_name,
        pipelines.state,
        SUM(file_state = "Loaded"):>int AS num_loaded,
        COUNT(file_state) AS num_total
      FROM information_schema.pipelines
      LEFT JOIN information_schema.pipelines_files ON (
        pipelines_files.pipeline_name = pipelines.pipeline_name
        AND pipelines_files.database_name = pipelines.database_name
      )
      WHERE pipelines.database_name = ? AND pipelines.pipeline_name != "worldcities"
      GROUP BY pipelines.pipeline_name
      HAVING num_loaded = num_total OR state != "Running"
    `,
    config.database
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

  try {
    await Promise.all(
      badPlans.map(({ planId }) =>
        Exec(config, `DROP ${planId} FROM PLANCACHE`)
      )
    );
  } catch (e) {
    if (!(e instanceof SQLError && e.isPlanMissing())) {
      throw e;
    }
  }

  return badPlans.length > 0;
};

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
        FROM information_schema.table_statistics stats
        INNER JOIN information_schema.mv_nodes nodes ON (
          stats.host = nodes.ip_addr
          AND stats.port = nodes.port
        )
        WHERE
          (
            partition_type = "Master"
            OR (
              partition_type = "Reference" AND nodes.type = "MA"
            )
          )
          AND database_name = ?
          AND table_name IN (${tablesSQL})
        GROUP BY table_name
        UNION ALL
        SELECT table_col AS tableName, 0 AS count
        FROM TABLE([${tablesSQL}])
      )
      GROUP BY tableName
    `,
    config.database
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
  const { maxRows } = scaleFactor;
  const tables = [
    "locations",
    "requests",
    "purchases",
    "notifications",
  ] as const;
  const tablesSQL = tables.map((name) => `"${name}"`).join(",");

  const oversizedTables = await QueryNoDb<{
    tableName: typeof tables[number];
    minTs: number;
    maxTs: number;
    count: number;
  }>(
    config,
    `
      SELECT
        stats.table_name AS tableName,
        stats.count,
        UNIX_TIMESTAMP(minmax.minTs) AS minTs,
        UNIX_TIMESTAMP(minmax.maxTs) AS maxTs
      FROM
        (
          SELECT database_name, table_name, SUM(rows) AS count
          FROM information_schema.table_statistics
          WHERE
            database_name = ?
            AND table_name IN (${tablesSQL})
            AND partition_type = "Master"
          GROUP BY database_name, table_name
        ) stats,
        (
          SELECT
            database_name, table_name,
            MIN(min_value) AS minTs,
            MAX(max_value) AS maxTs
          FROM information_schema.columnar_segments
          WHERE column_name = "ts"
          GROUP BY database_name, table_name
        ) minmax
      WHERE
        stats.database_name = minmax.database_name
        AND stats.table_name = minmax.table_name
        AND stats.count > ?
    `,
    config.database,
    maxRows
  );

  await Promise.all(
    oversizedTables.map(async ({ tableName, count, minTs, maxTs }) => {
      // calculate % of count to remove
      const delta = count - maxRows;
      const deltaPercent = delta / count;

      if (deltaPercent < 0.2) {
        return;
      }

      const ts = new Date((minTs + deltaPercent * (maxTs - minTs)) * 1000);
      console.log(
        `removing rows from ${tableName} older than ${ts.toISOString()}`
      );
      await Exec(
        config,
        `DELETE FROM ${tableName} WHERE ts <= ?`,
        ts.toISOString()
      );
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

// returns the timestamp to use in the next call to runUpdateSegments
export const runUpdateSegments = async (
  config: ConnectionConfig,
  since: string,
  pruneSegments = true
) => {
  const nowISO = new Date().toISOString();

  await Exec(config, "CALL update_segments(?, ?)", since, nowISO);

  if (pruneSegments) {
    await Exec(config, "CALL prune_segments(?)", nowISO);
  }

  return nowISO;
};

export type NotificationTuple = [ts: string, lon: number, lat: number];

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
        GEOGRAPHY_LONGITUDE(lonlat) AS lon,
        GEOGRAPHY_LATITUDE(lonlat) AS lat
      FROM notifications
      WHERE
        ts > ?
        AND GEOGRAPHY_CONTAINS(?, lonlat)
      ORDER BY ts DESC
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

export type City = {
  id: number;
  name: string;
  centerLat: number;
  centerLon: number;
  diameter: number;
};

export const getCities = (config: ConnectionConfig) =>
  Query<City>(
    config,
    `
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        diameter
      FROM cities
    `
  );

export const lookupClosestCity = (
  config: ConnectionConfig,
  lon: number,
  lat: number
) =>
  QueryOne<City>(
    config,
    `
      SELECT
        city_id AS id,
        city_name AS name,
        GEOGRAPHY_LATITUDE(center) AS centerLat,
        GEOGRAPHY_LONGITUDE(center) AS centerLon,
        0.1 AS diameter
      FROM worldcities
      ORDER BY GEOGRAPHY_DISTANCE(center, GEOGRAPHY_POINT(?, ?)) ASC
      LIMIT 1
    `,
    lon,
    lat
  );

export type ConversionEventTable = "requests" | "purchases";

const conversionMetricsBaseFragment = (eventsTable: ConversionEventTable) => `
  SELECT
    offer_notification.customer,
    offer_notification.notification_zone,
    offer_notification.offer_id,
    events.ts as converted_at
  FROM (
    SELECT
      offers.offer_id,
      offers.customer,
      offers.notification_zone,
      offers.notification_target,
      notifications.city_id,
      notifications.subscriber_id,
      FIRST(notifications.ts) AS ts
    FROM offers, notifications
    WHERE offers.offer_id = notifications.offer_id
    GROUP BY offers.offer_id, notifications.city_id, notifications.subscriber_id
  ) offer_notification
  LEFT JOIN ${eventsTable} AS events ON
    offer_notification.city_id = events.city_id
    AND offer_notification.subscriber_id = events.subscriber_id
    AND events.ts > offer_notification.ts
    ${
      eventsTable === "purchases"
        ? "AND events.vendor = offer_notification.customer"
        : "AND events.domain = offer_notification.notification_target"
    }
`;

export type CustomerMetrics = {
  customer: string;
  totalNotifications: number;
  totalConversions: number;
  conversionRate: number;
};

export const customerMetrics = (
  config: ConnectionConfig,
  eventTable: ConversionEventTable,
  sortColumn: keyof CustomerMetrics,
  limit: number
) =>
  Query<CustomerMetrics>(
    config,
    compileWithStatement({
      with: [["metrics", conversionMetricsBaseFragment(eventTable)]],
      base: `
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            metrics.customer,
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
          GROUP BY metrics.customer
        )
        ORDER BY ${sortColumn} DESC
        LIMIT ${limit}
      `,
    }).sql
  );

export const overallConversionRate = (
  config: ConnectionConfig,
  eventTable: ConversionEventTable
) =>
  QueryOne<{
    totalNotifications: number;
    totalConversions: number;
    conversionRate: number;
  }>(
    config,
    compileWithStatement({
      with: [["metrics", conversionMetricsBaseFragment(eventTable)]],
      base: `
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
        )
      `,
    }).sql
  );

export type ZoneMetrics = {
  wktPolygon: string;
  totalNotifications: number;
  totalConversions: number;
  conversionRate: number;
};

export const zoneMetrics = (
  config: ConnectionConfig,
  bounds: Bounds,
  eventTable: ConversionEventTable
) => {
  const query = compileWithStatement({
    with: [["metrics", conversionMetricsBaseFragment(eventTable)]],
    base: {
      sql: `
        SELECT
          *, (totalConversions / totalNotifications) :> DOUBLE AS conversionRate
        FROM (
          SELECT
            metrics.notification_zone AS wktPolygon,
            COUNT(metrics.offer_id) AS totalNotifications,
            COUNT(metrics.converted_at) AS totalConversions
          FROM metrics
          WHERE GEOGRAPHY_INTERSECTS(?, metrics.notification_zone)
          GROUP BY metrics.notification_zone
        )
      `,
      params: [boundsToWKTPolygon(bounds)],
    },
  });

  return Query<ZoneMetrics>(config, query.sql, ...query.params);
};

export type Session = {
  sessionID: string;
  isController: boolean;
  expiresAt: Date;
};

export const updateSessions = (
  config: ConnectionConfig,
  sessionID: string,
  leaseDurationSeconds: number
): Promise<Session> =>
  QueryOne(
    config,
    "CALL update_sessions(?, ?)",
    sessionID,
    leaseDurationSeconds
  ).then(
    ({ session_id, is_controller, expires_at }): Session => ({
      sessionID: session_id as string,
      isController: is_controller as boolean,
      expiresAt: new Date(expires_at as string),
    })
  );

export const setSessionController = (
  config: ConnectionConfig,
  sessionID: string,
  isController: boolean
) =>
  Exec(
    config,
    `
      UPDATE sessions
      SET is_controller = IFNULL(session_id = IF(?, ?, (
        SELECT session_id
        FROM sessions
        WHERE expires_at > NOW() AND session_id != ?
        ORDER BY session_id DESC
        LIMIT 1
      )), FALSE)
    `,
    isController,
    sessionID,
    sessionID
  );
