import dayjs from "dayjs";
import { useMemo, useRef } from "react";
import useSWR from "swr";

export type TimeseriesOpts<T> = {
  fetcher: () => Promise<T>;
  name: string;
  limit: number;
  intervalMS: number;
  emptyValue: T;
};

export const useTimeseries = <T>(
  opts: TimeseriesOpts<T>
): (T & { ts: Date })[] => {
  const defaultValue = useMemo(() => {
    const now = dayjs().startOf("second");
    return Array(opts.limit)
      .fill(opts.emptyValue)
      .map((x, i) => ({
        ...x,
        ts: now.subtract((opts.limit - i) * opts.intervalMS, "ms").toDate(),
      }));
  }, [opts.emptyValue, opts.intervalMS, opts.limit]);

  const cache = useRef<(T & { ts: Date })[]>(defaultValue);

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

  return data || defaultValue;
};
