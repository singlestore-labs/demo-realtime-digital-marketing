import { useConnectionState, useTick } from "@/data/hooks";
import { runMatchingProcess, runUpdateSegments } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

const TICK_INTERVAL_MATCH = 1 * 1000;
const TICK_INTERVAL_SEGMENTS = 10 * 1000;

export const useSimulator = () => {
  const config = useRecoilValue(connectionConfig);
  const enabled = useRecoilValue(simulatorEnabled);
  const { initialized } = useConnectionState();

  const matchingTick = useCallback(
    (ctx: AbortController) => runMatchingProcess({ ...config, ctx }, "minute"),
    [config]
  );

  useTick(matchingTick, {
    name: "SimulatorMatcher",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL_MATCH,
  });

  const updateSegmentsTick = useCallback(
    (ctx: AbortController) => runUpdateSegments({ ...config, ctx }),
    [config]
  );

  useTick(updateSegmentsTick, {
    name: "SimulatorUpdateSegments",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL_SEGMENTS,
  });
};
