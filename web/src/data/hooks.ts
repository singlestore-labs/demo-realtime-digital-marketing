import { SQLError } from "@/data/client";
import { isConnected, resetSchema, schemaObjects } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { FUNCTIONS, PROCEDURES, TABLES } from "@/data/sql";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";

const defaultSchemaObjects = Object.fromEntries(
  [
    TABLES.map(({ name }) => [name, false]),
    PROCEDURES.map(({ name }) => [name, false]),
    FUNCTIONS.map(({ name }) => [name, false]),
  ].flat()
);

export const useSchemaObjects = (paused = false) => {
  const config = useRecoilValue(connectionConfig);
  const isPaused = useCallback(() => paused, [paused]);
  return useSWR(["schemaObjects", config], () => schemaObjects(config), {
    isPaused,
    fallbackData: defaultSchemaObjects,
  });
};

export const useConnectionState = () => {
  // we are using ES6 spread syntax to remove database from config
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { database, ...config } = useRecoilValue(connectionConfig);

  const connected = useSWR(["isConnected", config], () => isConnected(config));
  const schemaObjs = useSchemaObjects(!connected.data);

  return {
    connected: !!connected.data,
    initialized:
      !!connected.data && Object.values(schemaObjs.data || []).every(Boolean),
    reset: () => {
      connected.mutate();
      schemaObjs.mutate();
    },
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
          duration: status === "success" ? 3000 : null,
          isClosable: status === "success",
        });
      } else {
        toast({ id, title, status, duration: null });
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
