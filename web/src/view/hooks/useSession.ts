import * as React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

import { updateSessions } from "@/data/queries";
import { connectionConfig, resettingSchema } from "@/data/recoil";
import { useConnectionState } from "@/view/hooks/hooks";

const SESSION_ID = (() => {
  const newUUID = () =>
    crypto && crypto.randomUUID ? crypto.randomUUID() : uuidv4();

  let sessionID: string;

  if (import.meta.hot) {
    const { data } = import.meta.hot;
    if (!("SESSION_ID" in data)) {
      data.SESSION_ID = newUUID();
    }
    sessionID = data.SESSION_ID;
  } else {
    sessionID = newUUID();
  }

  return sessionID;
})();

const SESSION_LEASE_SECONDS = 120; // 2 minutes - long enough to prevent timeout, short enough for quick failover

export const useSession = () => {
  const config = useRecoilValue(connectionConfig);
  const isResettingSchema = useRecoilValue(resettingSchema);
  const { connected, initialized } = useConnectionState();
  const { data, mutate } = useSWR(
    [config, "useSession"],
    () => updateSessions(config, SESSION_ID, SESSION_LEASE_SECONDS),
    {
      refreshInterval: 1000,
      isPaused: () => isResettingSchema || !connected || !initialized,
    }
  );

  // Only log when controller status is LOST (was true, now false)
  const prevController = React.useRef<boolean | null>(null);
  React.useEffect(() => {
    if (data) {
      const wasController = prevController.current === true;
      const isController = data.isController;

      // Only warn if we HAD controller status and LOST it
      if (wasController && !isController) {
        console.warn('⚠️ Simulator stopped - lost controller status');
      }

      prevController.current = isController;
    }
  }, [data]);

  return {
    session: data || {
      sessionID: SESSION_ID,
      isController: false,
      expiresAt: new Date(Date.now() + SESSION_LEASE_SECONDS * 1000),
    },
    refresh: mutate,
  };
};
