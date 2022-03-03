import { DEFAULT_CITY } from "@/data/offers";
import { Box, Link } from "@chakra-ui/react";
import "@pixi/graphics-extras";
import { Bounds, Map, PigeonProps, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import React, { useLayoutEffect, useRef, useState } from "react";

const stamenProvider =
  (flavor: "toner" | "toner-lite") =>
  (x: number, y: number, z: number, dpr = 1) =>
    `https://stamen-tiles.a.ssl.fastly.net/${flavor}/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png`;

const stamenAttribution = (
  <>
    Map tiles by <Link href="http://stamen.com">Stamen Design</Link>, under{" "}
    <Link href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</Link>.
    Data by <Link href="http://openstreetmap.org">OpenStreetMap</Link>, under{" "}
    <Link href="http://www.openstreetmap.org/copyright">ODbL</Link>.
  </>
);

export const DEFAULT_CENTER = [
  DEFAULT_CITY.lonlat[1],
  DEFAULT_CITY.lonlat[0],
] as [number, number];
export const DEFAULT_ZOOM = 12;

type RendererConfig = {
  scene: PIXI.Container;
  width: number;
  height: number;
  bounds: Bounds;
  latLngToPixel: (latLng: Point) => Point;
};

export type UsePixiRenderer = (ctx: RendererConfig) => {
  setup?: () => void;
  update?: (delta: number) => void;
};

type PixiMapLayerProps = {
  useRenderer: UsePixiRenderer;
} & Omit<RendererConfig, "scene">;

const PixiMapLayer = ({
  width,
  height,
  bounds,
  latLngToPixel,
  useRenderer,
}: PixiMapLayerProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef(new PIXI.Container());
  const { setup, update } = useRenderer({
    scene: sceneRef.current,
    width,
    height,
    bounds,
    latLngToPixel,
  });

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      // We expect canvasRef to always be set here because we are using
      // useLayoutEffect which fires syncronously after the component mounts.
      throw new Error("No canvas ref");
    }

    console.log("PixiMapLayer: Setup");

    const app = new PIXI.Application({
      view: canvasRef.current,
      width,
      height,
      backgroundAlpha: 0,
      antialias: true,
    });

    const scene = sceneRef.current;
    app.stage.addChild(scene);

    setup?.();
    if (update) {
      app.ticker.add((delta) => {
        update(delta);
      });
    }

    return () => {
      console.log("PixiMapLayer: Destroy");
      app.stage.removeChild(scene);
      app.destroy(false, {
        children: false,
        texture: true,
        baseTexture: true,
      });
    };
  }, [height, setup, update, width]);

  return <canvas ref={canvasRef} />;
};

type RequiresInitLayerProps = {
  useRenderer: UsePixiRenderer;
} & PigeonProps;

const RequiresInitLayer = ({
  mapState,
  latLngToPixel,
  useRenderer,
}: RequiresInitLayerProps) => {
  const { width, height, bounds } = mapState || { width: 0, height: 0 };
  if (width <= 0 || height <= 0 || !latLngToPixel || !bounds) {
    return null;
  }

  return (
    <PixiMapLayer
      useRenderer={useRenderer}
      width={width}
      height={height}
      bounds={bounds}
      latLngToPixel={latLngToPixel}
    />
  );
};

export type PixiMapProps = {
  useRenderer: UsePixiRenderer;
  height?: number | string;
  defaultCenter?: [number, number];
  defaultZoom?: number;
};

export const PixiMap = ({
  useRenderer,
  height = "100%",
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
}: PixiMapProps) => {
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);

  return (
    <Box borderRadius="lg" overflow="hidden" height={height}>
      <Map
        dprs={[1, 2]}
        provider={stamenProvider("toner-lite")}
        attribution={stamenAttribution}
        maxZoom={20}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        <RequiresInitLayer useRenderer={useRenderer} />
      </Map>
    </Box>
  );
};
