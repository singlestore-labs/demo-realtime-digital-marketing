import { DEFAULT_CITY } from "@/data/offers";
import { Box, BoxProps, Link, useConst } from "@chakra-ui/react";
import "@pixi/graphics-extras";
import { Bounds, Map, PigeonProps, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import React, { useLayoutEffect, useState } from "react";

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

type RendererConfig<T> = {
  scene: PIXI.Container;
  width: number;
  height: number;
  bounds: Bounds;
  latLngToPixel: (latLng: Point) => Point;
  pixelToLatLng: (pixel: Point) => Point;
  options: T;
};

export type UsePixiRenderer<T = unknown> = (ctx: RendererConfig<T>) => {
  setup?: () => void;
  update?: (delta: number) => void;
};

type PixiMapLayerProps<T> = {
  useRenderer: UsePixiRenderer<T>;
} & Omit<RendererConfig<T>, "scene">;

const PixiMapLayer = <T,>({
  width,
  height,
  bounds,
  latLngToPixel,
  pixelToLatLng,
  useRenderer,
  options,
}: PixiMapLayerProps<T>) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const scene = useConst(() => new PIXI.Container());
  const { setup, update } = useRenderer({
    scene,
    width,
    height,
    bounds,
    latLngToPixel,
    pixelToLatLng,
    options,
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
  }, [height, scene, setup, update, width]);

  return <canvas ref={canvasRef} />;
};

type RequiresInitLayerProps<T> = {
  useRenderer: UsePixiRenderer<T>;
  options: T;
} & PigeonProps;

const RequiresInitLayer = <T,>({
  mapState,
  latLngToPixel,
  pixelToLatLng,
  useRenderer,
  options,
}: RequiresInitLayerProps<T>) => {
  const { width, height, bounds } = mapState || { width: 0, height: 0 };
  if (
    width <= 0 ||
    height <= 0 ||
    !latLngToPixel ||
    !pixelToLatLng ||
    !bounds
  ) {
    return null;
  }

  return (
    <PixiMapLayer<T>
      useRenderer={useRenderer}
      width={width}
      height={height}
      bounds={bounds}
      latLngToPixel={latLngToPixel}
      pixelToLatLng={pixelToLatLng}
      options={options}
    />
  );
};

export type PixiMapProps<T> = {
  useRenderer: UsePixiRenderer<T>;
  height?: number | string;
  defaultCenter?: [number, number];
  defaultZoom?: number;
  options: T;
} & BoxProps;

export const PixiMap = <T,>({
  height = "100%",
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
  useRenderer,
  options,
  ...rest
}: PixiMapProps<T>) => {
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);

  return (
    <Box borderRadius="lg" overflow="hidden" height={height} {...rest}>
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
        <RequiresInitLayer useRenderer={useRenderer} options={options} />
      </Map>
    </Box>
  );
};
