import dedent from "ts-dedent";

import { SQLValue } from "@/data/client";

export interface CompiledQuery {
  sql: string;
  params: SQLValue[];
}

export type SQLChunk =
  | string
  | {
      sql: string;
      params?: SQLValue[];
    };

export type WithStatement = {
  with: [string, SQLChunk][];
  base: SQLChunk;
};

export type InsertStatement = {
  table: string;
  options?: {
    replace: boolean;
  };
  columns: string[];
  tuples: SQLValue[][];
};

export const compileInsert = (stmt: InsertStatement): CompiledQuery => {
  const { table, columns, tuples, options } = stmt;

  const tupleSQL = `(${columns.map(() => "?").join(",")})`;
  const valuesSQL = tuples.map(() => tupleSQL).join(",");

  return {
    sql: dedent`
      ${options?.replace ? "REPLACE" : "INSERT"} INTO ${table}
      (${columns.join(", ")})
      VALUES
        ${valuesSQL}
    `,
    params: tuples.flat(),
  };
};

export const compileChunk = (stmt: SQLChunk): CompiledQuery => {
  return {
    sql: typeof stmt === "string" ? stmt : stmt.sql,
    params: typeof stmt === "string" ? [] : stmt.params || [],
  };
};

export const compileWithStatement = (stmt: WithStatement): CompiledQuery => {
  const { with: fragments, base } = stmt;

  const fragmentsParams: SQLValue[] = [];
  const fragmentsSQL = fragments
    .map(([name, fragment]) => {
      const { sql, params } = compileChunk(fragment);
      fragmentsParams.push(...params);
      return `${name} AS (${dedent(sql)})`;
    })
    .join(",\n");

  const { sql, params } = compileChunk(base);
  return {
    sql: dedent`
      WITH ${fragmentsSQL}
      ${dedent(sql)}
    `,
    params: [...fragmentsParams, ...params],
  };
};
