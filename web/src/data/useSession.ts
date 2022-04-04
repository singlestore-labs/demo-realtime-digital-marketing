import { updateSessions } from "@/data/queries";
import { connectionConfig, resettingSchema } from "@/data/recoil";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

const SESSION_ID = (() => {
  const newUUID = () =>
    crypto && crypto.randomUUID ? crypto.randomUUID() : uuidv4();

  let sessionId: string;

  if (import.meta.hot) {
    const { data } = import.meta.hot;
    if (!("SESSION_ID" in data)) {
      data.SESSION_ID = newUUID();
    }
    sessionId = data.SESSION_ID;
  } else {
    sessionId = newUUID();
  }

  console.log(`Session ID: ${sessionId}`);
  return sessionId;
})();

const SESSION_LEASE_SECONDS = 60;

export const useSession = () => {
  const config = useRecoilValue(connectionConfig);
  const isResettingSchema = useRecoilValue(resettingSchema);
  const { data, mutate } = useSWR(
    [config, "useSession"],
    () => updateSessions(config, SESSION_ID, SESSION_LEASE_SECONDS),
    {
      refreshInterval: 1000,
      isPaused: () => isResettingSchema,
    }
  );
  return {
    session: data || {
      sessionId: SESSION_ID,
      isController: false,
      expiresAt: new Date(Date.now() + SESSION_LEASE_SECONDS * 1000),
    },
    refresh: mutate,
  };
};
