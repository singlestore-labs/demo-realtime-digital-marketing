import rawProcedures from "@/sql/procedures.sql?raw";
import rawSchema from "@/sql/schema.sql?raw";

const parseCreateStmt = (
  stmt: string
): { name: string; createStmt: string } => {
  const createStmt = stmt.trim();
  const name = createStmt.match(/^CREATE.+?(?<name>\w+) ?\(/i)?.groups?.name;
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
