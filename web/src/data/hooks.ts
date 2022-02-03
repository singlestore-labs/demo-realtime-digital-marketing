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

const nextTickID = (() => {
  let ids = {} as { [key: string]: number };

  // maintain id index across hot reload for a nicer dev experience
  if (import.meta.hot) {
    if (!("ids" in import.meta.hot.data)) {
      import.meta.hot.data.ids = {} as { [key: string]: number };
    }
    ids = import.meta.hot.data.ids;
  }

  return (prefix: string) => {
    if (!(prefix in ids)) {
      ids[prefix] = 1;
    }
    return `${prefix}(${ids[prefix]++})`;
  };
})();

export const useTick = (
  tick: (ctx: AbortController) => Promise<unknown>,
  { name, enabled, intervalMS }: TickOptions
) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const ctx = new AbortController();
    const tickID = nextTickID(name);

    console.log(`Starting ${tickID}: tick interval: ${intervalMS}ms`);

    const outerTick = async () => {
      try {
        console.time(tickID);

        if (ctx.signal.aborted) {
          return;
        }

        await tick(ctx);

        setTimeout(outerTick, intervalMS);
      } catch (e) {
        if (ctx.signal.aborted) {
          return;
        }
        if (e instanceof SQLError && e.isUnknownDatabase()) {
          return;
        }
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        throw e;
      } finally {
        console.timeEnd(tickID);
      }
    };

    outerTick();

    return () => {
      console.log(`Stopping ${tickID}`);
      ctx.abort();
    };
  }, [enabled, tick, intervalMS, name]);
};
