export type ScaleFactor = {
  name: string;
  maxRows: number;
  prefix: string;
  partitions: number;
};

export const ScaleFactors = [
  {
    name: "s00",
    maxRows: 36_000_000,
    prefix: "v2/100k-2p",
    partitions: 2,
  },
  {
    name: "s0",
    maxRows: 72_000_000,
    prefix: "v2/100k-4p",
    partitions: 4,
  },
  {
    name: "s1-small",
    maxRows: 144_000_000,
    prefix: "v2/100k-8p",
    partitions: 8,
  },
  {
    name: "s1",
    maxRows: 144_000_000,
    prefix: "v2/1m-8p",
    partitions: 8,
  },
  {
    name: "s2",
    maxRows: 288_000_000,
    prefix: "v2/1m-16p",
    partitions: 16,
  },
  {
    name: "s4",
    maxRows: 576_000_000,
    prefix: "v2/1m-32p",
    partitions: 16,
  },
  {
    name: "s8",
    maxRows: 1_152_000_000,
    prefix: "v2/1m-64p",
    partitions: 64,
  },
  {
    name: "s10",
    maxRows: 1_152_000_000,
    prefix: "v2/10m-80p",
    partitions: 80,
  },
];

// getScaleFactor looks up the ScaleFactor for the given name
export const getScaleFactor = (name: string): ScaleFactor =>
  ScaleFactors.find((sf) => sf.name === name) || ScaleFactors[0];