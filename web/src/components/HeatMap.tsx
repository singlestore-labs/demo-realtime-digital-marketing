import { useConst } from "@chakra-ui/react";
import * as d3color from "d3-color";
import { ScaleSequential, scaleSequential } from "d3-scale";
import { Bounds, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import * as React from "react";

import { PixiMap, PixiMapProps, UsePixiRenderer } from "@/components/PixiMap";
import { Polygon, WKTPolygonToPolygon } from "@/geo";
import { useDebounce } from "@/view/hooks/hooks";

// convert number (range 0-1) to color (hex)
export type ColorInterpolater = (t: number) => string;

interface RGBInterface {
  rgb(): { r: number; g: number; b: number };
  darker(n: number): RGBInterface;
}

const colorToRGBNumber = (c: RGBInterface): number => {
  const { r, g, b } = c.rgb();
  return (r << 16) | (g << 8) | b;
};

type CellConfig = {
  wktPolygon: string;
  value: number;
};

class HeatmapCell extends PIXI.Container {
  points: Polygon;
  polygon: PIXI.Graphics;
  hovering = false;
  color: number;
  hoverColor: number;

  constructor(
    public config: CellConfig,
    colorScale: ScaleSequential<d3color.CubehelixColor>
  ) {
    super();
    this.points = WKTPolygonToPolygon(config.wktPolygon);
    this.polygon = new PIXI.Graphics();
    this.addChild(this.polygon);

    // White color may not be visible due to light background of the map.
    // Adding extra color opacity to avoid pure white color.
    const color = colorScale(config.value + 0.01);
    this.color = colorToRGBNumber(color);
    this.hoverColor = colorToRGBNumber(color.darker(1));

    this.polygon.interactive = true;
    this.polygon.on("mouseover", () => {
      this.hovering = true;
    });
    this.polygon.on("mouseout", () => {
      this.hovering = false;
    });
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    const color = this.hovering ? this.hoverColor : this.color;
    this.polygon.clear();
    this.polygon.lineStyle(1.5, color, 0.5);
    this.polygon.beginFill(color, 0.2);
    this.polygon.drawPolygon(
      this.points.flatMap(([lng, lat]) => latLngToPixel([lat, lng]))
    );
    this.polygon.endFill();
  }
}

type RendererProps<T> = {
  useCells: (bounds: Bounds, callback: (cells: Array<T>) => void) => void;
  getCellConfig: (cell: T) => CellConfig;
  colorInterpolater: ColorInterpolater;
};

const makeUseRenderer =
  <T,>(props: RendererProps<T>): UsePixiRenderer =>
  ({ scene, latLngToPixel, bounds }) => {
    const debouncedBounds = useDebounce(bounds, 100);
    const scale = useConst(() =>
      scaleSequential((n: number) =>
        d3color.cubehelix(props.colorInterpolater(n))
      )
    );

    props.useCells(debouncedBounds, (cells) => {
      // clear the scene
      scene.removeChildren();

      let minValue = Infinity;
      let maxValue = -Infinity;

      const cfgs: Array<CellConfig> = [];
      for (const cell of cells) {
        const cfg = props.getCellConfig(cell);
        cfgs.push(cfg);

        if (cfg.value < minValue) {
          minValue = cfg.value;
        }
        if (cfg.value > maxValue) {
          maxValue = cfg.value;
        }
      }

      // update the scale domain to match the data
      scale.domain([minValue, maxValue]);

      for (const cfg of cfgs) {
        scene.addChild(new HeatmapCell(cfg, scale));
      }
    });

    return {
      update: React.useCallback(() => {
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
  const { useCells, getCellConfig, colorInterpolater, ...rest } = props;
  const useRenderer = React.useMemo(
    () => makeUseRenderer({ useCells, getCellConfig, colorInterpolater }),
    [colorInterpolater, getCellConfig, useCells]
  );
  return <PixiMap {...rest} useRenderer={useRenderer} options={{}} />;
};
