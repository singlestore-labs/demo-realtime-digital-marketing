import { SQLError } from "@/data/client";
import { isConnected, resetSchema, schemaObjects } from "@/data/queries";
import {
  connectionConfig,
  portalConnectionConfig,
  resettingSchema,
  simulatorEnabled,
  tickDurationMs,
} from "@/data/recoil";
import { FUNCTIONS, PROCEDURES, TABLES } from "@/data/sql";
import { useToast } from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useSWR, { useSWRConfig } from "swr";

const defaultSchemaObjects: { [key: string]: boolean } = Object.fromEntries(
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
        return missingObjs ? 1000 : 0;
      },
      fallbackData: defaultSchemaObjects,
    }
  );
};

export const useConnectionState = () => {
  // we are using ES6 spread syntax to remove database from config
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { database, ...config } = useRecoilValue(connectionConfig);
  const connected = useSWR(["isConnected", config], () => isConnected(config));
  const schemaObjs = useSchemaObjects(!connected.data);
  const portalConfig = useRecoilValue(portalConnectionConfig);

  let connectionType;

  if (portalConfig) {
    connectionType = "portal";
  } else if (connected.data) {
    connectionType = "manual";
  }

  return {
    connected: !!connected.data,
    initialized:
      !!connected.data && Object.values(schemaObjs.data || []).every(Boolean),
    reset: () => {
      connected.mutate();
      schemaObjs.mutate();
    },
    connectionType,
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

export const useInvalidateSWRCache = () => {
  const { cache, mutate } = useSWRConfig();
  if (!(cache instanceof Map)) {
    throw new Error(
      "useInvalidateSWRCache requires the cache provider to be a Map instance"
    );
  }
  return useCallback(async () => {
    for (const [key] of cache) {
      await mutate(key);
    }
  }, [cache, mutate]);
};

export const useResetSchema = ({
  before,
  after,
  includeSeedData,
  resetDataOnly = false,
}: {
  before: () => void;
  after: () => void;
  includeSeedData: boolean;
  resetDataOnly: boolean;
}) => {
  const config = useRecoilValue(connectionConfig);
  const [isSimulatorEnabled, setSimulatorEnabled] =
    useRecoilState(simulatorEnabled);
  const toast = useToast();
  const setResettingSchema = useSetRecoilState(resettingSchema);
  const invalidateSWRCache = useInvalidateSWRCache();

  return useCallback(async () => {
    // pre schema reset
    const simulatorEnabledBefore = isSimulatorEnabled;
    setSimulatorEnabled(false);
    setResettingSchema(true);
    before();

    // reset schema
    await resetSchema(config, {
      progress(title, status) {
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
      resetDataOnly,
    });

    // TODO: re-enable this once scale factors don't TKO clusters
    // count number of partitions to set default scale factor
    // const numPartitions = await countPartitions(config);
    // setScaleFactor(pickScaleFactor(numPartitions));

    // post schema reset
    after();
    await invalidateSWRCache();
    setSimulatorEnabled(simulatorEnabledBefore);
    setResettingSchema(false);
  }, [
    isSimulatorEnabled,
    setSimulatorEnabled,
    setResettingSchema,
    before,
    config,
    includeSeedData,
    resetDataOnly,
    after,
    invalidateSWRCache,
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

export const useMountedCallback = (
  callback: () => void,
  deps: React.DependencyList
) => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(() => {
    if (mounted.current) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
