import { mapBounds } from "@/data/recoil";
import { Box, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { Map, PigeonProps, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import React, { useLayoutEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const stamenProvider =
  (flavor: "toner" | "toner-lite") =>
  (x: number, y: number, z: number, dpr = 1) =>
    `https://stamen-tiles.a.ssl.fastly.net/${flavor}/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png`;

const stadiaProvider =
  (flavor: "smooth" | "smooth_dark") =>
  (x: number, y: number, z: number, dpr = 1) =>
    `https://tiles.stadiamaps.com/tiles/alidade_${flavor}/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png`;

const cartoDBProvider =
  (flavor: "light_all" | "dark_all") =>
  (x: number, y: number, z: number, dpr = 1) =>
    `https://a.basemaps.cartocdn.com/${flavor}/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png`;

export const DEFAULT_CENTER = [40.756480069543976, -73.95583135057566] as [
  number,
  number
];

type RendererConfig = {
  width: number;
  height: number;
  latLngToPixel: (latLng: Point) => Point;
};

export type PixiRenderer = (ctx: RendererConfig) => {
  scene: PIXI.Container;
  draw: (delta: number) => void;
  destroy: () => void;
};

type PixiMapLayerProps = { renderer: PixiRenderer } & PigeonProps;

const PixiMapLayer = ({
  mapState,
  latLngToPixel,
  renderer,
}: PixiMapLayerProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { width, height } = mapState || { width: 0, height: 0 };

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      // We expect canvasRef to always be set here because we are using
      // useLayoutEffect which fires syncronously after the component mounts.
      throw new Error("No canvas ref");
    }

    if (width <= 0 || height <= 0 || !latLngToPixel) {
      return;
    }

    console.log("PixiMapLayer: Setup");

    const app = new PIXI.Application({
      view: canvasRef.current,
      width,
      height,
      backgroundAlpha: 0,
      antialias: true,
    });

    const { scene, draw, destroy } = renderer({ width, height, latLngToPixel });
    app.stage.addChild(scene);

    app.ticker.add((delta) => {
      draw(delta);
    });

    return () => {
      console.log("PixiMapLayer: Destroy");
      destroy();
      app.destroy(false, {
        children: true,
        texture: true,
        baseTexture: true,
      });
    };
  }, [width, height, latLngToPixel, renderer]);

  return <canvas ref={canvasRef} />;
};

export const PixiMap = ({ renderer }: { renderer: PixiRenderer }) => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(12);
  const setBounds = useSetRecoilState(mapBounds);

  const attribution = (
    <>
      Map tiles &copy;{" "}
      <Link isExternal href="https://stadiamaps.com/">
        Stadia Maps
      </Link>
      , &copy;{" "}
      <Link isExternal href="https://openmaptiles.org">
        OpenMapTiles
      </Link>
      , data &copy;{" "}
      <Link isExternal href="https://openstreetmap.org">
        OpenStreetMap
      </Link>
      , under ODbL.
    </>
  );

  return (
    <Box borderRadius="lg" overflow="hidden" height="100%">
      <Map
        dprs={[1, 2]}
        provider={stadiaProvider(useColorModeValue("smooth", "smooth_dark"))}
        maxZoom={20}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom, bounds }) => {
          setCenter(center);
          setZoom(zoom);
          setBounds(bounds);
        }}
        attribution={attribution}
      >
        <PixiMapLayer renderer={renderer} />
      </Map>
    </Box>
  );
};
