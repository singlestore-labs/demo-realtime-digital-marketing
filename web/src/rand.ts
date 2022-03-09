import VENDORS from "@/static-data/vendors.json";

export const randomChoice = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const randomFloatInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const randomIntegerInRange = (min: number, max: number) =>
  Math.floor(randomFloatInRange(min, max));

export const randomVendor = () => randomChoice(VENDORS);
