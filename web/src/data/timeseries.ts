export type TimeseriesPoint = [Date, number];
export type Timeseries = Array<TimeseriesPoint>;

export const timeseriesIsEmpty = (series: Timeseries): boolean =>
  series.every(([, y]) => y === 0);
