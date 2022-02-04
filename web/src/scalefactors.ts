export const ScaleFactors = {
  small: {
    maxRows: 50_000_000,
    prefix: "v1/100k-16",
  },
  medium: {
    maxRows: 100_000_000,
    prefix: "v1/1m-32",
  },
  large: {
    maxRows: 1_000_000_000,
    prefix: "v1/10m-80",
  },
};
export type ScaleFactor = keyof typeof ScaleFactors;

export const isScaleFactor = (value: string): value is ScaleFactor =>
  Object.keys(ScaleFactors).includes(value);
