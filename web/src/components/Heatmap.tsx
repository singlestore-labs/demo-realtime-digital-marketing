import { PixiMap, PixiMapProps, UsePixiRenderer } from "@/components/PixiMap";
import { useDebounce } from "@/data/hooks";
import { Polygon, WKTPolygonToPolygon } from "@/geo";
import * as d3color from "d3-color";
import { Bounds, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback, useMemo } from "react";

const colorToRGBNumber = (c: d3color.ColorCommonInstance): number => {
  const { r, g, b } = c.rgb();
  return (r << 16) | (g << 8) | b;
};

type CellConfig = {
  wktPolygon: string;
  color: d3color.ColorCommonInstance;
  hoverColor: d3color.ColorCommonInstance;
};

class HeatmapCell extends PIXI.Container {
  points: Polygon;
  polygon: PIXI.Graphics;
  hovering = false;

  constructor(public config: CellConfig) {
    super();
    this.points = WKTPolygonToPolygon(config.wktPolygon);
    this.polygon = new PIXI.Graphics();
    this.addChild(this.polygon);

    this.polygon.interactive = true;
    this.polygon.on("mouseover", () => {
      this.hovering = true;
    });
    this.polygon.on("mouseout", () => {
      this.hovering = false;
    });
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    const color = this.hovering ? this.config.hoverColor : this.config.color;
    this.polygon.clear();
    this.polygon.lineStyle(1, colorToRGBNumber(color), 0.5);
    this.polygon.beginFill(colorToRGBNumber(color), 0.2);
    this.polygon.drawPolygon(
      this.points.flatMap(([lng, lat]) => latLngToPixel([lat, lng]))
    );
    this.polygon.endFill();
  }
}

type RendererProps<T> = {
  useCells: (bounds: Bounds, callback: (cells: T[]) => void) => void;
  getCellConfig: (cell: T) => CellConfig;
};

const makeUseRenderer =
  <T,>(props: RendererProps<T>): UsePixiRenderer =>
  ({ scene, latLngToPixel, bounds }) => {
    const debouncedBounds = useDebounce(bounds, 100);

    props.useCells(debouncedBounds, (cells) => {
      scene.removeChildren();
      for (const cell of cells) {
        scene.addChild(new HeatmapCell(props.getCellConfig(cell)));
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
  const { useCells, getCellConfig, ...rest } = props;
  const useRenderer = useMemo(
    () => makeUseRenderer({ useCells, getCellConfig }),
    [getCellConfig, useCells]
  );
  return <PixiMap {...rest} useRenderer={useRenderer} options={{}} />;
};
