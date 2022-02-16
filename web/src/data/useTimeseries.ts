import { useRef } from "react";
import useSWR from "swr";

export type TimeseriesOpts<T> = {
  fetcher: () => Promise<T>;
  name: string;
  limit: number;
  intervalMS: number;
};

export const useTimeseries = <T>(
  opts: TimeseriesOpts<T>
): (T & { ts: Date })[] => {
  const cache = useRef<(T & { ts: Date })[]>([]);

  const { data } = useSWR(
    ["timeseries", opts.name],
    async () => {
      const newData = await opts.fetcher();
      cache.current.push({
        ...newData,
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
