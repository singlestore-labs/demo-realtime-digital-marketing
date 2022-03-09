// these files are parsed at build time in vite.config.js
import FUNCTIONS from "@/sql/functions.sql";
import PROCEDURES from "@/sql/procedures.sql";
import TABLES from "@/sql/schema.sql";

export { FUNCTIONS, PROCEDURES, TABLES };

type SchemaObject = typeof FUNCTIONS[number];

export const BASE_DATA = [
  `CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,
  "REPLACE INTO customers VALUES (0, 'default customer')",
];

export const findSchemaObjectByName = (name: string): SchemaObject => {
  const obj = TABLES.find((x) => x.name === name);
  if (obj) {
    return obj;
  }
  const proc = PROCEDURES.find((x) => x.name === name);
  if (proc) {
    return proc;
  }
  const func = FUNCTIONS.find((x) => x.name === name);
  if (func) {
    return func;
  }
  throw new Error("Could not find schema object: " + name);
};
