import { SQLError } from "@/data/client";
import { connectionState, resetSchema } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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

        const start = +Date.now();

        await tick(ctx);

        const duration = +Date.now() - start;
        setTimeout(outerTick, Math.max(0, intervalMS - duration));
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

export const useResetSchema = ({
  before,
  after,
}: {
  before: () => void;
  after: () => void;
}) => {
  const config = useRecoilValue(connectionConfig);
  const { reset: resetConnectionState } = useConnectionState();
  const [isSimulatorEnabled, setSimulatorEnabled] =
    useRecoilState(simulatorEnabled);
  const toast = useToast();

  return useCallback(async () => {
    // pre schema reset
    const simulatorEnabledBefore = isSimulatorEnabled;
    setSimulatorEnabled(false);
    before();

    // reset schema
    await resetSchema(config, (title, status) => {
      const id = "reset-schema";
      if (toast.isActive(id)) {
        toast.update(id, {
          title,
          status,
          duration: 3000,
          isClosable: status === "success",
        });
      } else {
        toast({ id, title, status });
      }
    });

    // post schema reset
    after();
    resetConnectionState();
    setSimulatorEnabled(simulatorEnabledBefore);
  }, [
    isSimulatorEnabled,
    setSimulatorEnabled,
    before,
    config,
    after,
    resetConnectionState,
    toast,
  ]);
};
