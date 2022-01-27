import { ConnectionConfig, SQLError } from "@/data/client";
import { useConnectionState } from "@/data/hooks";
import {
  ensurePipelinesAreRunning,
  ensurePipelinesExist,
  runMatchingProcess,
  truncateTimeseriesTables,
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
    console.log("SimulationTick Start");
    console.time("SimulationTick");

    await Promise.all([
      ensurePipelinesExist(config, scaleFactor),
      ensurePipelinesAreRunning(config),
      truncateTimeseriesTables(config, scaleFactor),
      runMatchingProcess(config),
    ]);
  } finally {
    console.timeEnd("SimulationTick");
  }
};
