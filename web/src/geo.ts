export type Polygon = [number, number][];
export const polygonToSQL = (polygon: Polygon) => {
  const points = polygon.map((p) => `${p[0]} ${p[1]}`).join(",");
  return `POLYGON((${points}))`;
};
