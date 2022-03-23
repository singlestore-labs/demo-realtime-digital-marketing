// these files are parsed at build time in vite.config.js
import FUNCTIONS from "@/sql/functions.sql";
import PROCEDURES from "@/sql/procedures.sql";
import TABLES from "@/sql/schema.sql";

export { FUNCTIONS, PROCEDURES, TABLES };

export const S3_BUCKET_NAME = "singlestore-realtime-digital-marketing";

type SchemaObject = typeof FUNCTIONS[number];

export const BASE_DATA = [
  `CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,
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
  `,
  "START PIPELINE worldcities FOREGROUND",
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
