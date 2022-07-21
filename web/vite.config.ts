import react from "@vitejs/plugin-react";
import { basename } from "path";
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

  const parseStatement = (
    raw: string
  ): { kind: string; name?: string; statement: string } => {
    const statement = raw.trim();
    const kind = statement.split(" ")[0].trim().toLowerCase();
    const name = statement.match(/^CREATE.+?(?<name>\w+)(as| )*\(?\n/i)?.groups
      ?.name;
    if (name) {
      return { kind, name, statement };
    }
    return { kind, statement };
  };

  const parseStatements = (raw: string) =>
    raw
      .split(/(?<=;)/)
      .filter((s) => !!s.trim())
      .map(parseStatement);

  const parseProcedures = (raw: string) =>
    raw
      .replace(/DELIMITER (\/\/|;)/g, "")
      .split(/(?<=END \/\/)/)
      .filter((s) => !!s.trim())
      .map((s) => s.replace("END //", "END"))
      .map(parseStatement);

  const render = (data) => ({
    code: `export default ${JSON.stringify(data)};`,
    map: null,
  });

  return {
    name: "transform-sql",

    transform(src: string, id: string) {
      if (sqlRegex.test(id)) {
        switch (basename(id)) {
          case "schema.sql":
            return render(parseStatements(src));
          case "seed.sql":
            return render(parseStatements(src));
          case "pipelines.sql":
            return render(parseStatements(src));
          case "functions.sql":
            return render(parseProcedures(src));
          case "procedures.sql":
            return render(parseProcedures(src));
        }
      }
    },
  };
}
