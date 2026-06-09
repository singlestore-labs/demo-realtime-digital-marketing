// Top 100 most popular vendors for demo purposes
// This ensures high overlap between offers and purchases for better conversion tracking
import VENDORS from "@/static-data/vendors.json";

// Sort by CDF descending and take top 100
const sortedVendors = [...VENDORS].sort((a, b) => b.cdf - a.cdf).slice(0, 100);

// Renormalize CDF for just these 100 vendors
let runningSum = 0;
export const TOP_VENDORS = sortedVendors.map((v, idx) => {
  // Assign equal weight to each vendor for simplicity
  runningSum += 1;
  return {
    ...v,
    cdf: runningSum,
  };
});

export const TOP_VENDORS_MAX_CDF = runningSum;
