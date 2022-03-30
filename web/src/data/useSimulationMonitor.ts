import { useConnectionState, useTick } from "@/data/hooks";
import {
  checkPlans,
  ensurePipelinesAreRunning,
  ensurePipelinesExist,
  truncateTimeseriesTables,
} from "@/data/queries";
import { configScaleFactor, connectionConfig } from "@/data/recoil";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

const TICK_INTERVAL_MONITOR = 10 * 1000;

export const useSimulationMonitor = (enabled: boolean) => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const { initialized } = useConnectionState();

  const monitorTick = useCallback(
    (ctx: AbortController) => {
      const cfgWithCtx = { ...config, ctx };
      return Promise.all([
        ensurePipelinesExist(cfgWithCtx, scaleFactor),
        ensurePipelinesAreRunning(cfgWithCtx),
        truncateTimeseriesTables(cfgWithCtx, scaleFactor),
        checkPlans(cfgWithCtx),
      ]);
    },
    [config, scaleFactor]
  );

  useTick(monitorTick, {
    name: "SimulatorMonitor",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL_MONITOR,
  });
};
