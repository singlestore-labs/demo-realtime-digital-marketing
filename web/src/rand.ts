import { least } from "d3-array";

import { TOP_VENDORS, TOP_VENDORS_MAX_CDF } from "@/data/top-vendors";
import VENDORS from "@/static-data/vendors.json";

export type Vendor = (typeof VENDORS)[number];

export const randomChoice = <T>(arr: ReadonlyArray<T>): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const randomFloatInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const randomIntegerInRange = (min: number, max: number) =>
  Math.floor(randomFloatInRange(min, max));

export const randomVendor = (): Vendor => {
  const lastVendor = TOP_VENDORS[TOP_VENDORS.length - 1];
  const r = randomIntegerInRange(0, TOP_VENDORS_MAX_CDF);
  const out = least(TOP_VENDORS, (v) =>
    v.cdf >= r ? v.cdf - r : Number.MAX_SAFE_INTEGER
  );
  if (out) {
    return out;
  }
  return lastVendor;
};
