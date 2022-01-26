import { ConnectionConfig } from "@/data/client";
import { hasSchema } from "@/data/queries";

export const Simulator = (config: ConnectionConfig) => {
  console.log("Starting Simulator: config:", config);

  (async () => {
    console.log(await hasSchema(config));
  })();

  return () => {
    console.log("Stopping Simulator");
    // CLEANUP
  };
};
