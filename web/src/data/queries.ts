import { ConnectionConfig, Query, QueryNoDB, SQLError } from "@/data/client";
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
    const tables = (await Query(config, "SHOW TABLES")).map((r) => r[0]).sort();
    const procedures = (await Query(config, "SHOW PROCEDURES"))
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

// TODO: support custom partition counts
export const resetSchema = async (
  config: ConnectionConfig,
  progress: (msg: string, status: "info" | "success") => void
) => {
  progress("Dropping existing schema", "info");
  await QueryNoDB(config, "DROP DATABASE IF EXISTS `" + config.database + "`");

  progress("Creating database", "info");
  await QueryNoDB(config, "CREATE DATABASE `" + config.database + "`");

  for (const obj of TABLES) {
    progress(`Creating table: ${obj.name}`, "info");
    await Query(config, obj.createStmt);
  }
  for (const obj of PROCEDURES) {
    progress(`Creating procedure: ${obj.name}`, "info");
    await Query(config, obj.createStmt);
  }

  progress("Schema initialized", "success");
};
