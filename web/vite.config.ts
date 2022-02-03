import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    transformSQL(),
  ],
});

function transformSQL() {
  const sqlRegex = /\.(sql)$/;
  const schemaRegex = /schema\.(sql)$/;

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

  const parseTables = (raw: string) =>
    raw
      .split(/(?<=\);)/)
      .filter((s) => !!s.trim())
      .map(parseCreateStmt);

  const parseProcedures = (raw: string) =>
    raw
      .replace(/DELIMITER (\/\/|;)/g, "")
      .split(/(?<=END \/\/)/)
      .filter((s) => !!s.trim())
      .map((s) => s.replace("END //", "END"))
      .map(parseCreateStmt);

  return {
    name: "transform-sql",

    transform(src: string, id: string) {
      if (sqlRegex.test(id)) {
        const arr = schemaRegex.test(id)
          ? parseTables(src)
          : parseProcedures(src);
        return {
          code: `export default ${JSON.stringify(arr)};`,
          map: null,
        };
      }
    },
  };
}
