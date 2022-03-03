import { SQLValue } from "@/data/client";
import dedent from "ts-dedent";

export interface SQLChunk {
  sql(): string;
  params(): SQLValue[];
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
