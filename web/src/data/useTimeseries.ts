import { useRef } from "react";
import useSWR from "swr";

export type TimeseriesOpts<T> = {
  fetcher: () => Promise<T>;
  name: string;
  deps?: unknown[];
  limit: number;
  intervalMS: number;
};

export const useTimeseries = <T>(
  opts: TimeseriesOpts<T>
): { ts: Date; data: T }[] => {
  const cache = useRef<{ ts: Date; data: T }[]>([]);

  const { data } = useSWR(
    ["timeseries", opts.name, ...(opts.deps || [])],
    async () => {
      const newData = await opts.fetcher();
      cache.current.push({
        data: newData,
        ts: new Date(),
      });

      // truncate cache.current to limit
      cache.current = cache.current.slice(-opts.limit);

      return cache.current;
    },
    {
      refreshInterval: opts.intervalMS,
    }
  );

  return data || [];
};
