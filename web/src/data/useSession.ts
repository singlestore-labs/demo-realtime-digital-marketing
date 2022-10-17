import { useConnectionState } from "@/data/hooks";
import { updateSessions } from "@/data/queries";
import { connectionConfig, resettingSchema } from "@/data/recoil";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

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

const SESSION_LEASE_SECONDS = 60;

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
  return {
    session: data || {
      sessionID: SESSION_ID,
      isController: false,
      expiresAt: new Date(Date.now() + SESSION_LEASE_SECONDS * 1000),
    },
    refresh: mutate,
  };
};
