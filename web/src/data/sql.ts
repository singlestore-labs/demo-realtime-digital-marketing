// these files are parsed at build time in vite.config.js
import FUNCTIONS from "@/sql/functions.sql";
import PIPELINES from "@/sql/pipelines.sql";
import PROCEDURES from "@/sql/procedures.sql";
import TABLES from "@/sql/schema.sql";
import SEED from "@/sql/seed.sql";

export { FUNCTIONS, PROCEDURES, TABLES, PIPELINES, SEED };

export const S3_BUCKET_NAME = "singlestore-realtime-digital-marketing";

type SchemaObject = typeof FUNCTIONS[0];

export const findSchemaObjectByName = (name: string): SchemaObject => {
  const search = [FUNCTIONS, PROCEDURES, TABLES, SEED];

  for (const schema of search) {
    const object = schema.find((o) => o.name === name);
    if (object) {
      return object;
    }
  }

  throw new Error("Could not find schema object: " + name);
};

export const findPipelineByName = (name: string): SchemaObject => {
  const object = PIPELINES.find((o) => o.name === name);
  if (object) {
    return object;
  }

  throw new Error("Could not find pipeline " + name);
};
