export type ScaleFactor = {
  name: string;
  maxRows: number;
  prefix: string;
  partitions: number;
};

export const ScaleFactors: ScaleFactor[] = [
  {
    name: "micro",
    maxRows: 1_000_000,
    prefix: "v2/1k-2p",
    partitions: 2,
  },
  {
    name: "tiny",
    maxRows: 5_000_000,
    prefix: "v2/10k-2p",
    partitions: 2,
  },
  {
    name: "s00",
    maxRows: 10_000_000,
    prefix: "v2/100k-2p",
    partitions: 2,
  },
  {
    name: "s0",
    maxRows: 20_000_000,
    prefix: "v2/100k-4p",
    partitions: 4,
  },
  {
    name: "s1",
    maxRows: 40_000_000,
    prefix: "v2/100k-8p",
    partitions: 8,
  },
  {
    name: "s2",
    maxRows: 160_000_000,
    prefix: "v2/1m-16p",
    partitions: 16,
  },
  {
    name: "s4",
    maxRows: 320_000_000,
    prefix: "v2/1m-32p",
    partitions: 16,
  },
  {
    name: "s8",
    maxRows: 640_000_000,
    prefix: "v2/1m-64p",
    partitions: 64,
  },
  {
    name: "s10",
    maxRows: 1_000_000_000,
    prefix: "v2/10m-80p",
    partitions: 80,
  },
];

// getScaleFactor looks up the ScaleFactor for the given name
export const getScaleFactor = (name: string): ScaleFactor =>
  ScaleFactors.find((sf) => sf.name === name) || ScaleFactors[0];

export const defaultScaleFactor = getScaleFactor("s00");

export const pickScaleFactor = (numPartitions: number): ScaleFactor => {
  // pick the scale factor with the largest number of partitions <= numPartitions
  return (
    [...ScaleFactors]
      .sort((a, b) => b.partitions - a.partitions)
      .find((sf) => sf.partitions <= numPartitions) ||
    ScaleFactors[ScaleFactors.length - 1]
  );
};
