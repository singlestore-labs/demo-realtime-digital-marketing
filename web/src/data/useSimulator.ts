import { useConnectionState, useTick } from "@/data/hooks";
import {
  ensurePipelinesAreRunning,
  ensurePipelinesExist,
  runMatchingProcess,
  runUpdateSegments,
  truncateTimeseriesTables,
} from "@/data/queries";
import {
  configScaleFactor,
  connectionConfig,
  simulatorEnabled,
} from "@/data/recoil";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

const TICK_INTERVAL_MONITOR = 10 * 1000;
const TICK_INTERVAL_MATCH = 1 * 1000;

export const useSimulator = () => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const enabled = useRecoilValue(simulatorEnabled);
  const { initialized } = useConnectionState();

  const monitorTick = useCallback(
    (ctx: AbortController) => {
      const cfgWithCtx = { ...config, ctx };
      return Promise.all([
        ensurePipelinesExist(cfgWithCtx, scaleFactor),
        ensurePipelinesAreRunning(cfgWithCtx),
        truncateTimeseriesTables(cfgWithCtx, scaleFactor),
      ]);
    },
    [config, scaleFactor]
  );

  useTick(monitorTick, {
    name: "SimulatorMonitor",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL_MONITOR,
  });

  const matchingTick = useCallback(
    (ctx: AbortController) => {
      const cfgWithCtx = { ...config, ctx };
      return Promise.all([
        runUpdateSegments(cfgWithCtx),
        runMatchingProcess(cfgWithCtx),
      ]);
    },
    [config]
  );

  useTick(matchingTick, {
    name: "SimulatorMatcher",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL_MATCH,
  });
};
