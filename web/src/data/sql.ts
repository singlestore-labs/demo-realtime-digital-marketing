// these files are parsed at build time in vite.config.js
import FUNCTIONS from "@/sql/functions.sql";
import PROCEDURES from "@/sql/procedures.sql";
import TABLES from "@/sql/schema.sql";

export { FUNCTIONS, PROCEDURES, TABLES };

export const BASE_DATA = [
  `CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,
  "REPLACE INTO customers VALUES (0, 'default customer')",
];
