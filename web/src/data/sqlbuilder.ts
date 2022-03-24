import { SQLValue } from "@/data/client";
import dedent from "ts-dedent";

export interface SQLChunk {
  sql(): string;
  params(): SQLValue[];
}

export class SQLChunkNoParams implements SQLChunk {
  constructor(private _sql: string) {}
  sql(): string {
    return this._sql;
  }
  params(): SQLValue[] {
    return [];
  }
}

const toSQLChunk = (sql: string | SQLChunk): SQLChunk => {
  if (typeof sql === "string") {
    return new SQLChunkNoParams(sql);
  }
  return sql;
};

export class QueryWithFragments implements SQLChunk {
  fragments: [string, SQLChunk][] = [];
  baseQuery: SQLChunk;

  constructor(baseQuery: SQLChunk | string) {
    this.baseQuery = toSQLChunk(baseQuery);
  }

  with(name: string, fragment: SQLChunk | string) {
    this.fragments.push([name, toSQLChunk(fragment)]);
    return this;
  }

  sql(): string {
    let out = "";
    if (this.fragments.length > 0) {
      out += "WITH ";
      for (let i = 0; i < this.fragments.length; i++) {
        const [name, fragment] = this.fragments[i];
        out += `${name} AS (${dedent(fragment.sql())})`;
        if (i < this.fragments.length - 1) {
          out += ",\n";
        }
      }
    }

    out += "\n" + dedent(this.baseQuery.sql());
    return out;
  }

  params(): SQLValue[] {
    const fragParams = this.fragments.flatMap(([, f]) => f.params());
    return [...fragParams, ...this.baseQuery.params()];
  }
}

export class MultiInsert implements SQLChunk {
  tuples: SQLValue[][] = [];

  constructor(
    public table: string,
    public columns: string[],
    public replace: boolean = false
  ) {}

  append(...tuple: SQLValue[]) {
    if (tuple.length !== this.columns.length) {
      throw new Error(
        `Expected ${this.columns.length} values, got ${tuple.length}`
      );
    }
    this.tuples.push(tuple);
  }

  clear() {
    this.tuples = [];
  }

  sql() {
    const tupleSQL = `(${this.columns.map(() => "?").join(",")})`;
    const valuesSQL = this.tuples.map(() => tupleSQL).join(",");

    return dedent`
      ${this.replace ? "REPLACE" : "INSERT"} INTO ${this.table}
      (${this.columns.join(", ")})
      VALUES
        ${valuesSQL}
    `;
  }

  params() {
    return this.tuples.flat();
  }
}

export class MultiReplace extends MultiInsert {
  constructor(table: string, columns: string[]) {
    super(table, columns, true);
  }
}
