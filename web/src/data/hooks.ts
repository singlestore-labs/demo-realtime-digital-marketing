import { SQLError } from "@/data/client";
import { connectionState } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

export const useConnectionState = () => {
  const config = useRecoilValue(connectionConfig);
  const { data, mutate } = useSWR(["connectionState", config], () =>
    connectionState(config)
  );
  return {
    connected: false,
    initialized: false,
    reset: mutate,
    ...data,
  };
};

export type TickOptions = {
  name: string;
  enabled: boolean;
  intervalMS: number;
};

export const useTick = (
  tick: (ctx: AbortController) => Promise<unknown>,
  { name, enabled, intervalMS }: TickOptions
) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    console.log(`Starting ${name}: tick interval: ${intervalMS}ms`);

    const ctx = new AbortController();

    const outerTick = async () => {
      try {
        if (ctx.signal.aborted) {
          return;
        }

        console.time(name);

        await tick(ctx);

        setTimeout(outerTick, intervalMS);
      } catch (e) {
        if (e instanceof SQLError && e.isUnknownDatabase()) {
          return;
        }
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        throw e;
      } finally {
        console.timeEnd(name);
      }
    };

    outerTick();

    return () => {
      console.log(`Stopping ${name}`);
      ctx.abort();
    };
  }, [enabled, tick, intervalMS, name]);
};
