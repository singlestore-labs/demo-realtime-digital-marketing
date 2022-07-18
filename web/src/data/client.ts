export type ConnectionConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
  ctx?: AbortController;
};

export type ConnectionConfigOptionalDatabase = Omit<
  ConnectionConfig,
  "database"
> & {
  database?: string;
};

export type SQLValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: SQLValue }
  | SQLValue[];

export type Row = { [key: string]: SQLValue };

const regexSQLErrorCode = /^Error (?<code>\d+):/;

const DEBUG = false;

export class SQLError extends Error {
  code: number;
  sql: string;

  constructor(msg: string, sql: string, code?: number) {
    super(msg);
    // https://stackoverflow.com/a/41429145/65872
    Object.setPrototypeOf(this, SQLError.prototype);
    this.sql = sql;

    if (code) {
      this.code = code;
    } else {
      const matched = msg.match(regexSQLErrorCode);
      this.code = matched ? parseInt(matched.groups?.code || "-1", 10) : -1;
    }
  }

  isUnknownDatabase() {
    return this.code === 1049;
  }

  isDatabaseRecovering() {
    return this.code === 2269;
  }

  isPlanMissing() {
    return this.code === 1885;
  }
}

export const QueryOne = async <T = Row>(
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
): Promise<T> => {
  const rows = await Query<T>(config, sql, ...args);

  if (rows.length !== 1) {
    throw new SQLError("Expected exactly one row", sql);
  }

  return rows[0];
};

export const Query = async <T = Row>(
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
): Promise<T[]> => {
  const data = await fetchEndpoint("query/rows", config, sql, ...args);

  if (data.results.length !== 1) {
    throw new SQLError("Expected exactly one result set", sql);
  }

  return data.results[0].rows;
};

export const QueryNoDb = <T = Row>(
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
): Promise<T[]> => Query({ ...config, database: undefined }, sql, ...args);

export const QueryTuples = async <T extends [...SQLValue[]] = SQLValue[]>(
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
): Promise<T[]> => {
  const data = await fetchEndpoint("query/tuples", config, sql, ...args);

  if (data.results.length !== 1) {
    throw new SQLError("Expected exactly one result set", sql);
  }

  return data.results[0].rows;
};

export const ExecNoDb = (
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
): Promise<{ lastInsertId: number; rowsAffected: number }> =>
  fetchEndpoint("exec", { ...config, database: undefined }, sql, ...args);

export const Exec = (
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
): Promise<{ lastInsertId: number; rowsAffected: number }> =>
  fetchEndpoint("exec", config, sql, ...args);

const fetchEndpoint = async (
  endpoint: string,
  config: ConnectionConfigOptionalDatabase,
  sql: string,
  ...args: SQLValue[]
) => {
  if (DEBUG) {
    console.log("running query", sql, args);
  }

  const response = await fetch(`${config.host}/api/v2/${endpoint}`, {
    method: "POST",
    signal: config.ctx?.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${config.user}:${config.password}`)}`,
    },
    body: JSON.stringify({ sql, args, database: config.database }),
  });

  if (!response.ok) {
    throw new SQLError(await response.text(), sql);
  }

  const data = await response.json();

  if (data.error) {
    throw new SQLError(data.error.message, sql, data.error.code);
  }
  return data;
};
