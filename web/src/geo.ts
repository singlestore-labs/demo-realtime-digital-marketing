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

export const boundsContains = (b: Bounds, lat: number, lng: number) => {
  return lat <= b.ne[0] && lng <= b.ne[1] && lat >= b.sw[0] && lng >= b.sw[1];
};
