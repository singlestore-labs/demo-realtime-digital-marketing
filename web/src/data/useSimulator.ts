import { useConnectionState, useTick } from "@/data/hooks";
import { runMatchingProcess, runUpdateSegments } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { useCallback, useRef } from "react";
import { useRecoilValue } from "recoil";

const TICK_INTERVAL_MATCH = 1 * 1000;
const TICK_INTERVAL_SEGMENTS = 1 * 1000;

export const useSimulator = (enabled: boolean) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  const timestampCursor = useRef(new Date(0).toISOString());

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
    async (ctx: AbortController) => {
      timestampCursor.current = await runUpdateSegments(
        { ...config, ctx },
        timestampCursor.current
      );
    },
    [config]
  );

  useTick(updateSegmentsTick, {
    name: "SimulatorUpdateSegments",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL_SEGMENTS,
  });
};
