import { PixiMap, PixiMapProps, UsePixiRenderer } from "@/components/PixiMap";
import { useDebounce } from "@/data/hooks";
import { Polygon, WKTPolygonToPolygon } from "@/geo";
import { Bounds, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback, useMemo } from "react";

class HeatmapCell extends PIXI.Container {
  points: Polygon;
  polygon: PIXI.Graphics;

  constructor(wktPolygon: string, public color: number) {
    super();
    this.points = WKTPolygonToPolygon(wktPolygon);
    this.polygon = new PIXI.Graphics();
    this.addChild(this.polygon);

    this.polygon.interactive = true;
    this.polygon.on("mouseover", () => {
      this.polygon.tint = 0x00ff00;
    });
    this.polygon.on("mouseout", () => {
      this.polygon.tint = 0xffffff;
    });
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    this.polygon.clear();
    this.polygon.lineStyle(1, this.color, 1);
    this.polygon.beginFill(this.color, 0.2);
    this.polygon.drawPolygon(
      this.points.flatMap(([lng, lat]) => latLngToPixel([lat, lng]))
    );
    this.polygon.endFill();
  }
}

type RendererProps<T> = {
  useCells: (bounds: Bounds, callback: (cells: T[]) => void) => void;
  getCellColor: (cell: T) => number;
  getCellWKTPolygon: (cell: T) => string;
};

const makeUseRenderer =
  <T,>(props: RendererProps<T>): UsePixiRenderer =>
  ({ scene, latLngToPixel, bounds }) => {
    const debouncedBounds = useDebounce(bounds, 100);

    props.useCells(debouncedBounds, (cells) => {
      scene.removeChildren();
      for (const cell of cells) {
        scene.addChild(
          new HeatmapCell(
            props.getCellWKTPolygon(cell),
            props.getCellColor(cell)
          )
        );
      }
    });

    return {
      update: useCallback(() => {
        for (let i = 0; i < scene.children.length; i++) {
          const child = scene.children[i] as HeatmapCell;
          child.update(latLngToPixel);
        }
      }, [latLngToPixel, scene]),
    };
  };

export type HeatmapProps<T> = RendererProps<T> &
  Omit<PixiMapProps<unknown>, "useRenderer" | "options">;

export const Heatmap = <T,>(props: HeatmapProps<T>) => {
  const useRenderer = useMemo(() => makeUseRenderer(props), [props]);
  return <PixiMap {...props} useRenderer={useRenderer} options={{}} />;
};
