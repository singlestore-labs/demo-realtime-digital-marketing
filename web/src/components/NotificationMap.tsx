import { ConnectionConfig } from "@/data/client";
import { useConnectionState } from "@/data/hooks";
import { loadLatestNotificationsContainedBy } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { Box, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { Bounds, Map, PigeonProps } from "pigeon-maps";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

const stamenProvider =
  (flavor: "toner" | "toner-lite") =>
  (x: number, y: number, z: number, dpr = 1) =>
    `https://stamen-tiles.a.ssl.fastly.net/${flavor}/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png`;

const DEFAULT_CENTER = [40.756480069543976, -73.95583135057566] as [
  number,
  number
];

const drawPoint = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

const notificationFetcher = () => {
  let lastTs = "";
  return async (config: ConnectionConfig, bounds: Bounds) => {
    console.log(lastTs);
    const result = await loadLatestNotificationsContainedBy(
      config,
      bounds,
      lastTs
    );
    if (result.length > 0) {
      lastTs = result[0][2];
    }
    return result;
  };
};

const fetcher = notificationFetcher();

const NotificationLayer = ({ latLngToPixel, mapState }: PigeonProps) => {
  const connState = useConnectionState();
  const isSimulatorEnabled = useRecoilValue(simulatorEnabled);
  const config = useRecoilValue(connectionConfig);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data } = useSWR(
    [connState, isSimulatorEnabled, config, "notifications"],
    () =>
      connState.connected &&
      connState.initialized &&
      isSimulatorEnabled &&
      mapState
        ? fetcher(config, mapState.bounds)
        : null
    //{ refreshInterval: 1000 }
  );

  useEffect(() => {
    const $canvas = canvasRef.current;
    if (!$canvas) {
      return;
    }

    const ctx = $canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const { width, height } = $canvas;

    // clear canvas
    ctx.clearRect(0, 0, width, height);

    for (const [lon, lat] of data || []) {
      const [x, y] = latLngToPixel ? latLngToPixel([lat, lon]) : [0, 0];
      ctx.fillStyle = "red";
      drawPoint(ctx, x, y, 4);
    }
  }, [canvasRef, data, mapState?.bounds, latLngToPixel]);

  return (
    <canvas
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      width={mapState?.width}
      height={mapState?.height}
      ref={canvasRef}
    />
  );
};

export const NotificationMap = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(12);

  return (
    <Box borderRadius="lg" overflow="hidden" height="100%">
      <Map
        provider={stamenProvider(useColorModeValue("toner-lite", "toner"))}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        attribution={
          <>
            Map tiles by{" "}
            <Link isExternal href="http://maps.stamen.com">
              Stamen Design
            </Link>
            , under CC BY 3.0. Data by{" "}
            <Link isExternal href="https://osm.org">
              OpenStreetMap
            </Link>
            , under ODbL.
          </>
        }
      >
        <NotificationLayer />
      </Map>
    </Box>
  );
};
