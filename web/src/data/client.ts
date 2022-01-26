export type ConnectionConfig = {
  host: string;
  user: string;
  password: string;
  database?: string;
};

type SQLValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: SQLValue }
  | SQLValue[];

type Row = SQLValue[];
type Rows = Row[];

const regexSQLErrorCode = /^Error (?<code>\d+):/;

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
      this.code = matched ? parseInt(matched.groups?.code || "-1") : -1;
    }
  }
}

export const QueryOne = async (
  config: ConnectionConfig,
  sql: string,
  ...args: SQLValue[]
): Promise<Row> => {
  const result = await Query(config, sql, ...args);
  if (result.length !== 1) {
    throw new SQLError("Expected exactly one row", sql);
  }
  return result[0];
};

export const QueryNoDB = async (
  config: ConnectionConfig,
  sql: string,
  ...args: SQLValue[]
): Promise<Rows> => Query({ ...config, database: undefined }, sql, ...args);

export const Query = async (
  config: ConnectionConfig,
  sql: string,
  ...args: SQLValue[]
): Promise<Rows> => {
  const response = await fetch(`${config.host}/api/v1/query/tuples`, {
    method: "POST",
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

  if (data.results.length !== 1) {
    throw new SQLError("Expected exactly one result set", sql);
  }

  return data.results[0].rows;
};
