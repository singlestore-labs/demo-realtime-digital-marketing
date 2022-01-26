import {
  ConnectionConfig,
  Exec,
  ExecNoDb,
  Query,
  QueryTuples,
  SQLError,
} from "@/data/client";
import { PROCEDURES, TABLES } from "@/data/sql";

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
    // 1049: Unknown database
    if (e instanceof SQLError && e.code === 1049) {
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
