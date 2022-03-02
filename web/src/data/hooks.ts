import { SQLError } from "@/data/client";
import { isConnected, resetSchema, schemaObjects } from "@/data/queries";
import {
  connectionConfig,
  simulatorEnabled,
  skipCreateDatabase,
  tickDurationMs,
  vaporConnectionConfig,
} from "@/data/recoil";
import { FUNCTIONS, PROCEDURES, TABLES } from "@/data/sql";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  return useSWR(
    ["schemaObjects", config, paused],
    () => schemaObjects(config),
    {
      isPaused: () => paused,
      refreshInterval: (data) => {
        const missingObjs = Object.values(data || []).some((x) => !x);
        return missingObjs ? 500 : 0;
      },
      fallbackData: defaultSchemaObjects,
    }
  );
};

export const useConnectionState = () => {
  // we are using ES6 spread syntax to remove database from config
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { database, ...config } = useRecoilValue(connectionConfig);
  const vaporConfig = useRecoilValue(vaporConnectionConfig);

  const connected = useSWR(["isConnected", config], () => isConnected(config));
  const schemaObjs = useSchemaObjects(!connected.data);

  return {
    isVapor: !!vaporConfig,
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
  const setTickDurationMs = useSetRecoilState(tickDurationMs(name));

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

        const start = performance.now();

        await tick(ctx);

        const duration = performance.now() - start;

        setTickDurationMs(duration);
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
  }, [enabled, tick, intervalMS, name, setTickDurationMs]);
};

export const useResetSchema = ({
  before,
  after,
  includeSeedData = true,
}: {
  before: () => void;
  after: () => void;
  includeSeedData?: boolean;
}) => {
  const config = useRecoilValue(connectionConfig);
  const { reset: resetConnectionState } = useConnectionState();
  const [isSimulatorEnabled, setSimulatorEnabled] =
    useRecoilState(simulatorEnabled);
  const toast = useToast();
  const skipCreate = useRecoilValue(skipCreateDatabase);

  return useCallback(async () => {
    // pre schema reset
    const simulatorEnabledBefore = isSimulatorEnabled;
    setSimulatorEnabled(false);
    before();

    // reset schema
    await resetSchema(
      config,
      (title, status) => {
        const id = "reset-schema";
        if (toast.isActive(id)) {
          toast.update(id, {
            title,
            status,
            duration: status === "success" ? 2000 : null,
            isClosable: true,
          });
        } else {
          toast({ id, title, status, duration: null });
        }
      },
      includeSeedData,
      !!skipCreate
    );

    // post schema reset
    after();
    resetConnectionState();
    setSimulatorEnabled(simulatorEnabledBefore);
  }, [
    isSimulatorEnabled,
    setSimulatorEnabled,
    before,
    config,
    includeSeedData,
    skipCreate,
    after,
    resetConnectionState,
    toast,
  ]);
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export const useTimer = () => {
  type State = { start?: number; elapsed?: number; isRunning: boolean };
  type Action = { type: "start" } | { type: "stop" };

  const [{ elapsed, isRunning }, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "start":
          return {
            start: Math.floor(performance.now()),
            isRunning: true,

            // keep around last elapsed value
            elapsed: state.elapsed,
          };
        case "stop":
          return {
            elapsed: Math.floor(performance.now()) - (state.start || 0),
            isRunning: false,
          };
      }
    },
    { isRunning: false }
  );

  return {
    elapsed,
    isRunning,
    startTimer: () => dispatch({ type: "start" }),
    stopTimer: () => dispatch({ type: "stop" }),
  };
};