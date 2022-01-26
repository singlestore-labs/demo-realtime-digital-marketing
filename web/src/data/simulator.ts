import { ConnectionConfig } from "@/data/client";
import { getCities } from "@/data/queries";

export const Simulator = (config: ConnectionConfig) => {
  console.log("Starting Simulator: config:", config);

  (async () => {
    const cities = await getCities(config);
    console.log(cities);
  })();

  return () => {
    console.log("Stopping Simulator");
    // CLEANUP
  };
};
