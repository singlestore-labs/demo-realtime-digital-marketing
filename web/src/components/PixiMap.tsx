import "@pixi/graphics-extras";

import {
  Box,
  BoxProps,
  Center,
  Divider,
  Flex,
  Link,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useConst,
} from "@chakra-ui/react";
import { Bounds, Map, PigeonProps, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import React from "react";
import Select from "react-select";
import { useRecoilState } from "recoil";

import { Loader } from "@/components/loader/Loader";
import { DEFAULT_CITY } from "@/data/offers";
import { City } from "@/data/queries";
import {
  isUpdatingCities,
  selectedCities as selectedCitiesFromRecoil,
  selectedCity,
} from "@/data/recoil";
import { useConnectionState } from "@/view/hooks/hooks";

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

export const DEFAULT_CENTER: [number, number] = [
  DEFAULT_CITY.lonlat[1],
  DEFAULT_CITY.lonlat[0],
];
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

  React.useLayoutEffect(() => {
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
  selectionDropdownTop?: React.CSSProperties["top"];
  selectionDropdownLeft?: React.CSSProperties["left"];
  defaultCenter?: [number, number] | undefined;
  showCitySelectionDropDown?: boolean;
  options: T;
} & BoxProps;

export const PixiMap = <T,>({
  height = "100%",
  selectionDropdownLeft = "10px",
  selectionDropdownTop = "10px",
  showCitySelectionDropDown = true,
  defaultCenter,
  useRenderer,
  options,
}: PixiMapProps<T>) => {
  const [center, setCenter] = React.useState(defaultCenter || DEFAULT_CENTER);
  const [zoom] = React.useState(DEFAULT_ZOOM);
  const { colorMode } = useColorMode();
  const [lastSelectedCityId, setLastSelectedCityId] = useRecoilState(selectedCity);
  const [selectedCities] = useRecoilState(selectedCitiesFromRecoil);
  const [isUpdating] = useRecoilState(isUpdatingCities);
  const [forceUpdateMap, setForceUpdateMap] = React.useState(false);
  const { connected } = useConnectionState();
  const [dropdownDisabledMsg, setDropdownDisabledMsg] = React.useState("");
  const [lastSelectedCityDetails, setLastSelectedCityDetails] = React.useState<City | undefined>(undefined);

  let selectionValue = { label: "Select city", value: { id: -1 } };
  if (lastSelectedCityDetails) {
    selectionValue = {
      label: lastSelectedCityDetails.name,
      value: lastSelectedCityDetails,
    };
  }

  let centerValue: [number, number] | undefined = undefined;
  if (lastSelectedCityDetails && !defaultCenter) {
    centerValue = [
      lastSelectedCityDetails.centerLat,
      lastSelectedCityDetails.centerLon,
    ];
  } else if (defaultCenter) {
    centerValue = [defaultCenter[1], defaultCenter[0]];
  }

  React.useEffect(() => {
    if (!connected) {
      setDropdownDisabledMsg("Please configure connection to change map city");
    } else if (selectedCities.length <= 0) {
      setDropdownDisabledMsg(
        "You need to select atleast one city from dashboard's Locations section"
      );
    } else if (isUpdating) {
      setDropdownDisabledMsg("City list is updating please wait");
    }
  }, [connected, isUpdating, selectedCities]);

  React.useEffect(() => {
    
    setLastSelectedCityDetails(
      selectedCities.find((c) => c.id === lastSelectedCityId)
    );
  }, [selectedCities, lastSelectedCityId]);

  React.useEffect(() => {
    
    if (lastSelectedCityDetails && !defaultCenter) {
      setCenter([
        lastSelectedCityDetails.centerLat,
        lastSelectedCityDetails.centerLon,
      ]);
    }
  }, [defaultCenter, lastSelectedCityDetails]);

  React.useEffect(() => {
    if (isUpdating) {
      setForceUpdateMap(true);
    } else {
      setForceUpdateMap(false);
    }
  }, [isUpdating, setForceUpdateMap]);

  return (
    <Stack spacing={0} position="relative" height={height}>
      {showCitySelectionDropDown ? (
        <Flex
          position="absolute"
          zIndex={5}
          top={selectionDropdownTop}
          left={selectionDropdownLeft}
          background={colorMode === "light" ? "#553ACF" : "#CCC3F9"}
          color={colorMode === "light" ? "white" : "black"}
          boxShadow="1px 6px 6px grey"
          width="-webkit-fit-content"
          justifyContent="space-between"
          gap={1}
          padding="0px 2px 0px 10px"
          borderRadius="6px"
          alignItems="center"
        >
          <Box display="inline">
            <Text display="inline">Map view</Text>
          </Box>
          <Center
            height="25px"
            margin="2px 0px 2px 5px"
            background={colorMode === "light" ? "white" : "black"}
          >
            <Divider
              color={colorMode === "light" ? "black" : "white"}
              orientation="vertical"
            />
          </Center>
          <Tooltip
            isDisabled={
              !(selectedCities.length <= 0 || isUpdating || !connected)
            }
            label={dropdownDisabledMsg}
          >
            <Box display="inline">
              <Select
                options={selectedCities.map((c) => ({
                  label: c.name,
                  value: c,
                }))}
                value={selectionValue}
                onChange={(e) => setLastSelectedCityId(() => e?.value.id || -1)}
                isDisabled={
                  selectedCities.length <= 0 || isUpdating || !connected
                }
                styles={{
                  input: (props) => ({
                    ...props,
                    background: "transparent",
                    cursor: "pointer",
                  }),
                  placeholder: (props) => ({
                    ...props,
                    color: colorMode === "light" ? "white" : "black",
                  }),
                  option: (props) => ({
                    ...props,
                    background: "white",
                    cursor: "pointer",
                    color: "#4C4A57",
                  }),
                  dropdownIndicator: (props) => ({
                    ...props,
                    color: colorMode === "light" ? "white" : "black",
                  }),
                  indicatorSeparator: (props) => ({
                    ...props,
                    display: "none",
                  }),
                  control: (props) => ({
                    ...props,
                    background: "transparent",
                    border: "none",
                  }),
                  singleValue: (props) => ({
                    ...props,
                    color: colorMode === "light" ? "white" : "black",
                  }),
                }}
              />
            </Box>
          </Tooltip>
        </Flex>
      ) : undefined}
      <Box width="inherit" height={height}>
        {!forceUpdateMap ? (
          <Map
            dprs={[1, 2]}
            provider={stamenProvider("toner-lite")}
            attribution={stamenAttribution}
            maxZoom={20}
            defaultCenter={
              !lastSelectedCityDetails || defaultCenter ? center : undefined
            }
            center={centerValue}
            zoom={zoom}
          >
            <RequiresInitLayer useRenderer={useRenderer} options={options} />
          </Map>
        ) : (
          <Loader size="large" centered={true} />
        )}
      </Box>
    </Stack>
  );
};
