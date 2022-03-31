export type TimeseriesPoint = [Date, number];
export type Timeseries = TimeseriesPoint[];

export const timeseriesIsEmpty = (series: Timeseries): boolean =>
  series.every(([, y]) => y === 0);
