import { trackAnalyticsEvent } from "@/analytics";
import { PixiMap, PixiMapProps, UsePixiRenderer } from "@/components/PixiMap";
import { useConnectionState } from "@/data/hooks";
import { createCity, removeCity } from "@/data/offers";
import {
  City,
  getCities,
  lookupClosestCity,
  seedCityWithOffers,
} from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { onClick } from "@/events";
import { ScaleFactors } from "@/scalefactors";
import { useConst } from "@chakra-ui/react";
import { Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

type Props = Omit<PixiMapProps<unknown>, "useRenderer" | "options">;

class PIXICity extends PIXI.Container {
  gfx: PIXI.Graphics;
  hover = false;

  constructor(public city: City, public onRemove: (city: City) => void) {
    super();
    this.gfx = new PIXI.Graphics();
    this.addChild(this.gfx);

    this.gfx.interactive = true;
    this.gfx.on("pointerover", () => {
      this.hover = true;
    });
    this.gfx.on("pointerout", () => {
      this.hover = false;
    });
    onClick(this.gfx, () => onRemove(this.city));
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    this.gfx.clear();
    this.gfx.lineStyle(1, this.hover ? 0xff0000 : 0x04adff, 1);
    this.gfx.beginFill(this.hover ? 0xff0000 : 0x04adff, 0.2);
    const [x, y] = latLngToPixel([this.city.centerLat, this.city.centerLon]);
    this.gfx.drawCircle(x, y, 25);
    this.gfx.endFill();
  }
}

const useCities = (onSuccess: (cities: City[]) => void) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  return useSWR(["cities", config, initialized], () => getCities(config), {
    isPaused: () => !initialized,
    onSuccess,
  });
};

const useRenderer: UsePixiRenderer = ({
  scene,
  latLngToPixel,
  pixelToLatLng,
  width,
  height,
}) => {
  const config = useRecoilValue(connectionConfig);
  const container = useConst(() => new PIXI.Container());

  const { mutate } = useCities((cities) => {
    container.removeChildren();
    for (let i = 0; i < cities.length; i++) {
      container.addChild(new PIXICity(cities[i], onRemoveCity));
    }
  });

  const onCreateCity = useCallback(
    async (lat: number, lon: number) => {
      const city = await lookupClosestCity(config, lon, lat);
      const cityConfig = {
        id: city.id,
        name: city.name,
        lonlat: [city.centerLon, city.centerLat] as Point,
        diameter: city.diameter,
      };
      await createCity(config, cityConfig);
      trackAnalyticsEvent("create-city");
      await seedCityWithOffers(config, cityConfig, ScaleFactors[0]);
      mutate();
    },
    [config, mutate]
  );

  const onRemoveCity = useCallback(
    async (city: City) => {
      await removeCity(config, city.id);
      trackAnalyticsEvent("remove-city");
      mutate();
    },
    [config, mutate]
  );

  return {
    setup: useCallback(() => {
      const bg = new PIXI.Container();
      scene.addChild(bg);

      scene.addChild(container);

      bg.interactive = true;
      bg.hitArea = new PIXI.Rectangle(0, 0, width, height);

      onClick(bg, (evt) => {
        const [lat, lng] = pixelToLatLng([
          evt.data.global.x,
          evt.data.global.y,
        ]);
        onCreateCity(lat, lng);
      });
    }, [container, height, onCreateCity, pixelToLatLng, scene, width]),

    update: useCallback(() => {
      for (let i = 0; i < container.children.length; i++) {
        const child = container.children[i] as PIXICity;
        child.update(latLngToPixel);
      }
    }, [container, latLngToPixel]),
  };
};

export const CityMap = (props: Props) => {
  return (
    <PixiMap
      {...props}
      useRenderer={useRenderer}
      options={{}}
      cursor="pointer"
    />
  );
};
