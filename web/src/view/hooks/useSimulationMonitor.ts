import React from "react";
import { useRecoilValue } from "recoil";

import {
  checkPlans,
  ensurePipelinesAreRunning,
  ensurePipelinesExist,
  truncateTimeseriesTables,
} from "@/data/queries";
import { configScaleFactor, connectionConfig } from "@/data/recoil";
import { useConnectionState, useTick } from "@/view/hooks/hooks";
import { useSession } from "@/view/hooks/useSession";

const TICK_INTERVAL_MONITOR = 10 * 1000;

export const useSimulationMonitor = (enabled: boolean) => {
  const config = useRecoilValue(connectionConfig);
  const scaleFactor = useRecoilValue(configScaleFactor);
  const { initialized } = useConnectionState();
  const { session } = useSession();

  const monitorTick = React.useCallback(
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
    enabled: initialized && enabled && session.isController,
    intervalMS: TICK_INTERVAL_MONITOR,
  });
};
