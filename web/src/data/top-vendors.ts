// Top 100 most popular vendors for demo purposes
// This ensures high overlap between offers and purchases for better conversion tracking
// This file is the exact same list used by the Go simulator (data/vendors-top100.json)
import TOP_VENDORS_RAW from "@/static-data/vendors-top100.json";

export const TOP_VENDORS = TOP_VENDORS_RAW;
export const TOP_VENDORS_MAX_CDF = TOP_VENDORS[TOP_VENDORS.length - 1].cdf;
