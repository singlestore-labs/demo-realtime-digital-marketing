import { ConnectionConfig, SQLError } from "@/data/client";
import { useConnectionState } from "@/data/hooks";
import {
  createPipelinesForCity,
  ensurePipelinesAreRunning,
  getCities,
  runMatchingProcess,
  truncateTableIfNeeded,
} from "@/data/queries";
import {
  configScaleFactor,
  connectionConfig,
  ScaleFactor,
  simulatorEnabled,
} from "@/data/recoil";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const TICK_INTERVAL = 10 * 1000;

export const useSimulator = () => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const enabled = useRecoilValue(simulatorEnabled);
  const { initialized } = useConnectionState();

  useEffect(() => {
    if (!initialized || !enabled) {
      return;
    }

    console.group("Starting Simulator");
    console.log("host:", config.host);
    console.log("scale factor:", scaleFactor);
    console.groupEnd();

    let running = true;
    const ctx = new AbortController();
    const configWithCtx = { ...config, ctx };

    const tick = async () => {
      try {
        if (!running) {
          return;
        }
        await SimulationTick(configWithCtx, scaleFactor);
        setTimeout(tick, TICK_INTERVAL);
      } catch (e) {
        if (e instanceof SQLError && e.isUnknownDatabase()) {
          return;
        }
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        throw e;
      }
    };

    tick();

    return () => {
      console.log("Stopping Simulator");
      running = false;
      ctx.abort();
    };
  }, [initialized, enabled, config, scaleFactor]);
};

const SimulationTick = async (
  config: ConnectionConfig,
  scaleFactor: ScaleFactor
) => {
  try {
    console.time("SimulationTick");

    const cities = await getCities(config);
    await Promise.all(
      cities.map((city) => createPipelinesForCity(config, city, scaleFactor))
    );
    await ensurePipelinesAreRunning(config);

    const timeseriesTables = [
      "locations",
      "requests",
      "purchases",
      "notifications",
    ];
    await Promise.all(
      timeseriesTables.map((table) =>
        truncateTableIfNeeded(config, table, scaleFactor)
      )
    );

    await runMatchingProcess(config);
  } finally {
    console.timeEnd("SimulationTick");
  }
};
