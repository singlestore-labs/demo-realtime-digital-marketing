import rawProcedures from "@/sql/procedures.sql?raw";
import rawSchema from "@/sql/schema.sql?raw";

const parseCreateStmt = (
  stmt: string
): { name: string; createStmt: string } => {
  const createStmt = stmt.trim();
  const name = createStmt.match(/^CREATE.+?(?<name>\w+)(as| )*\(/i)?.groups
    ?.name;
  if (name) {
    return { name, createStmt };
  }
  console.error(stmt);
  throw new Error("failed to parse table name");
};

export const TABLES = rawSchema
  .split(/(?<=\);)/)
  .filter((s) => !!s.trim())
  .map(parseCreateStmt);

export const PROCEDURES = rawProcedures
  .replaceAll(/DELIMITER (\/\/|;)/g, "")
  .split(/(?<=END \/\/)/)
  .filter((s) => !!s.trim())
  .map((s) => s.replace("//", ""))
  .map(parseCreateStmt);

export const SEED_DATA = [
  `CREATE LINK aws_s3 AS S3 CREDENTIALS '{}' CONFIG '{ "region": "us-east-1" }'`,
  "REPLACE INTO cities VALUES (0, 'new york', 'POINT(-74.006 40.7128)', 0.5)",
  "REPLACE INTO customers VALUES (0, 's2cellular')",
  `
    REPLACE INTO offers SET
        offer_id = 0,
        customer_id = 0,
        enabled = true,

        notification_zone = 'POLYGON((-74.0085465553596 40.73811655378369,-73.99275370867991 40.73811655378369,-73.99275370867991 40.72627932318957,-74.0085465553596 40.72627932318957,-74.0085465553596 40.73811655378369))',
        notification_criteria = '[]',

        notification_content = 'Buy an eWatch, 50% off',
        notification_target = 'example.com?offer=1234',

        maximum_bid_cents = 10
  `,
];
