import * as React from "react";
import { useRecoilValue } from "recoil";

import { runMatchingProcess, runUpdateSegments } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { toISOStringNoTZ } from "@/datetime";
import { useConnectionState, useTick } from "@/view/hooks/hooks";
import { useSession } from "@/view/hooks/useSession";

const TICK_INTERVAL_MATCH = 1 * 1000;
const TICK_INTERVAL_SEGMENTS = 1 * 1000;

export const useSimulator = (enabled: boolean) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  const timestampCursor = React.useRef(toISOStringNoTZ(new Date(0)));
  const { session } = useSession();

  const matchingTick = React.useCallback(
    (ctx: AbortController) => runMatchingProcess({ ...config, ctx }, "minute"),
    [config]
  );

  useTick(matchingTick, {
    name: "SimulatorMatcher",
    enabled: initialized && enabled && session.isController,
    intervalMS: TICK_INTERVAL_MATCH,
  });

  const updateSegmentsTick = React.useCallback(
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
    enabled: initialized && enabled && session.isController,
    intervalMS: TICK_INTERVAL_SEGMENTS,
  });
};
