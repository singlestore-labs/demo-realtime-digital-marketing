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
  useColorModeValue,
  useConst,
} from "@chakra-ui/react";
import { Bounds, Map, PigeonProps, Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import * as React from "react";
import Select, { GroupBase, StylesConfig } from "react-select";
import { useRecoilState } from "recoil";

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

const CitySelectionDropdown: React.FC<{
  selectionDropdownLeft?: string | number;
  selectionDropdownTop?: string | number;
  lastSelectedCityDetails: City | undefined;
}> = ({
  lastSelectedCityDetails,
  selectionDropdownTop = "10px",
  selectionDropdownLeft = "10px",
}) => {
  const { colorMode } = useColorMode();
  const [isUpdating] = useRecoilState(isUpdatingCities);
  const { connected } = useConnectionState();
  const [_lastSelectedCityId, setLastSelectedCityId] =
    useRecoilState(selectedCity);
  const [selectedCities] = useRecoilState(selectedCitiesFromRecoil);
  const [dropdownDisabledMsg, setDropdownDisabledMsg] = React.useState("");
  const [dropdownDisabled, setDropdownDisabled] =
    React.useState<boolean>(false);
  const options = selectedCities.map((c) => ({ label: c.name, value: c }));

  let fontColor = "white";
  if (colorMode === "dark") {
    fontColor = "black";
  }

  let selectionValue = { label: "Select city", value: { id: -1 } };
  if (lastSelectedCityDetails) {
    selectionValue = {
      label: lastSelectedCityDetails.name,
      value: lastSelectedCityDetails,
    };
  }

  const selectionStyle: StylesConfig<
    { label: string; value: { id: number } },
    false,
    GroupBase<{ label: string; value: { id: number } }>
  > = {
    input: (props) => ({
      ...props,
      background: "transparent",
      minWidth: "85px",
      cursor: "pointer",
      boxShadow: "none"
    }),
    placeholder: (props) => ({
      ...props,
      color: fontColor,
    }),
    option: (props) => ({
      ...props,
      background: "white",
      cursor: "pointer",
      color: "#4C4A57",
    }),
    dropdownIndicator: (props) => ({
      ...props,
      color: fontColor,
    }),
    indicatorSeparator: (props) => ({
      ...props,
      display: "none",
    }),
    control: (props) => ({
      ...props,
      background: "transparent",
      border: "none",
      boxShadow: "none"
    }),
    singleValue: (props) => ({
      ...props,
      color: fontColor,
    }),
  };

  React.useEffect(() => {
    setDropdownDisabled(selectedCities.length <= 0 || isUpdating || !connected);
    if (selectedCities.length <= 0) {
      setDropdownDisabledMsg(
        "You need to select at least one city from the available locations on the Dashboard page"
      );
    } else if (isUpdating) {
      setDropdownDisabledMsg("City list is updating, please wait.");
    }
  }, [connected, isUpdating, selectedCities]);

  return (
    <Flex
      position="absolute"
      zIndex={5}
      top={selectionDropdownTop}
      left={selectionDropdownLeft}
      background={useColorModeValue("#553ACF", "#CCC3F9")}
      color={fontColor}
      boxShadow="1px 6px 6px grey"
      justifyContent="space-between"
      gap={1}
      padding="0px 2px 0px 10px"
      borderRadius="6px"
      alignItems="center"
    >
      <Box display="inline">
        <Text display="inline">Map view</Text>
      </Box>
      <Center height="25px" margin="2px 0px 2px 5px" background={fontColor}>
        <Divider color={fontColor} orientation="vertical" />
      </Center>
      <Tooltip isDisabled={!dropdownDisabled} label={dropdownDisabledMsg}>
        <Box display="inline">
          <Select
            options={options}
            value={selectionValue}
            onChange={(e) => setLastSelectedCityId(e?.value.id || -1)}
            isDisabled={dropdownDisabled}
            styles={selectionStyle}
          />
        </Box>
      </Tooltip>
    </Flex>
  );
};

export type PixiMapProps<T> = {
  options: T;
  useRenderer: UsePixiRenderer<T>;
  height?: number | string;
  selectionDropdownTop?: React.CSSProperties["top"];
  selectionDropdownLeft?: React.CSSProperties["left"];
  defaultCenter?: [number, number] | undefined;
  showCitySelectionDropDown?: boolean;
  zoom?: number;
} & BoxProps;

export const PixiMap = <T,>({
  height = "100%",
  selectionDropdownLeft = "10px",
  selectionDropdownTop = "10px",
  showCitySelectionDropDown = true,
  defaultCenter,
  useRenderer,
  zoom = DEFAULT_ZOOM,
  options,
  ...rest
}: PixiMapProps<T>) => {
  const [lastSelectedCityId] = useRecoilState(selectedCity);
  const [selectedCities] = useRecoilState(selectedCitiesFromRecoil);
  const [lastSelectedCityDetails, setLastSelectedCityDetails] = React.useState<
    City | undefined
  >(undefined);
  const [mapZoom, setMapZoom] = React.useState(zoom);

  let initialPosition = DEFAULT_CENTER;
  if (lastSelectedCityDetails) {
    initialPosition = [
      lastSelectedCityDetails.centerLat,
      lastSelectedCityDetails.centerLon,
    ];
  }
  const [centerValue, setCenterValue] =
    React.useState<[number, number]>(initialPosition);

  let citySelectionDropdown;
  if (showCitySelectionDropDown) {
    citySelectionDropdown = (
      <CitySelectionDropdown
        selectionDropdownLeft={selectionDropdownLeft}
        selectionDropdownTop={selectionDropdownTop}
        lastSelectedCityDetails={lastSelectedCityDetails}
      />
    );
  }

  const handleBoundsChange = ({
    center,
    zoom,
  }: {
    center: [number, number];
    zoom: number;
  }) => {
    setMapZoom(zoom);
    setCenterValue(center);
  };

  React.useEffect(() => {
    setLastSelectedCityDetails(
      selectedCities.find((c) => c.id === lastSelectedCityId)
    );
  }, [selectedCities, lastSelectedCityId]);

  React.useEffect(() => {
    if (lastSelectedCityDetails && !defaultCenter) {
      setCenterValue([
        lastSelectedCityDetails.centerLat,
        lastSelectedCityDetails.centerLon,
      ]);
    }
  }, [lastSelectedCityDetails, defaultCenter]);

  return (
    <Stack spacing={0} height={height} position="relative">
      {citySelectionDropdown}
      <Box width="100%" overflow="hidden" height={height} {...rest}>
        <Map
          dprs={[1, 2]}
          provider={stamenProvider("toner-lite")}
          attribution={stamenAttribution}
          maxZoom={18}
          minZoom={5}
          onBoundsChanged={handleBoundsChange}
          center={defaultCenter || centerValue}
          defaultZoom={mapZoom}
        >
          <RequiresInitLayer useRenderer={useRenderer} options={options} />
        </Map>
      </Box>
    </Stack>
  );
};
