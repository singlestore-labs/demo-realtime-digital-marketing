import { Bounds } from "pigeon-maps";

export type Polygon = [number, number][];

export const polygonToSQL = (polygon: Polygon) => {
  const points = polygon.map((p) => `${p[0]} ${p[1]}`).join(",");
  return `POLYGON((${points}))`;
};

export const boundsToWKTPolygon = (bounds: Bounds) => {
  const [minLat, maxLon] = bounds.ne;
  const [maxLat, minLon] = bounds.sw;

  return polygonToSQL([
    [minLon, minLat],
    [maxLon, minLat],
    [maxLon, maxLat],
    [minLon, maxLat],
    [minLon, minLat],
  ]);
};

const WKT_POLYGON_PREFIX = "POLYGON((";
const WKT_POLYGON_SUFFIX = "))";

export const WKTPolygonToPolygon = (polygon: string): Polygon => {
  // NOTE: this function only handles simple polygons (single segment)
  // example: POLYGON((-74.04367371 40.69802040, -74.04166051 40.69645297, -74.03991248 40.69770204, -74.04174768 40.69914786, -74.04124261 40.69953674, -74.04025555 40.69880482, -74.03771124 40.69934404, -74.03938278 40.70057769, -74.03995040 40.70089063, -74.04367371 40.69802040))
  // a polygon with multiple segments will result in some points being NaN
  if (
    polygon.startsWith(WKT_POLYGON_PREFIX) &&
    polygon.endsWith(WKT_POLYGON_SUFFIX)
  ) {
    const points = polygon
      .slice(WKT_POLYGON_PREFIX.length, -WKT_POLYGON_SUFFIX.length)
      .split(",");
    return points.map((p) => {
      const [lon, lat] = p.trim().split(" ");
      return [parseFloat(lon), parseFloat(lat)];
    });
  }
  throw new Error(`Invalid WKT polygon: ${polygon}`);
};

export const boundsContains = (b: Bounds, lat: number, lng: number) => {
  return lat <= b.ne[0] && lng <= b.ne[1] && lat >= b.sw[0] && lng >= b.sw[1];
};
