import { PixiMap, PixiMapProps, UsePixiRenderer } from "@/components/PixiMap";
import { useConnectionState, useDebounce } from "@/data/hooks";
import { Offer, queryOffersInBounds } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { Polygon, WKTPolygonToPolygon } from "@/geo";
import { Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

type Props = Omit<PixiMapProps, "useRenderer">;

const MAX_OFFERS = 1000;

class PIXIOffer extends PIXI.Container {
  offer: Offer;
  points: Polygon;
  polygon: PIXI.Graphics;

  constructor(offer: Offer) {
    super();
    this.offer = offer;
    this.points = WKTPolygonToPolygon(offer.notificationZone);
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
    this.polygon.lineStyle(1, 0x04adff, 1);
    this.polygon.beginFill(0x04adff, 0.2);
    this.polygon.drawPolygon(
      this.points.flatMap(([lng, lat]) => latLngToPixel([lat, lng]))
    );
    this.polygon.endFill();
  }
}

const useRenderer: UsePixiRenderer = ({ scene, latLngToPixel, bounds }) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  const debouncedBounds = useDebounce(bounds, 50);

  useSWR(
    ["offers", config, initialized, debouncedBounds],
    () => queryOffersInBounds(config, MAX_OFFERS, debouncedBounds),
    {
      isPaused: () => !initialized,
      onSuccess: (offers) => {
        scene.removeChildren();
        for (let i = 0; i < offers.length; i++) {
          scene.addChild(new PIXIOffer(offers[i]));
        }
      },
    }
  );

  return {
    update: useCallback(() => {
      for (let i = 0; i < scene.children.length; i++) {
        const child = scene.children[i] as PIXIOffer;
        child.update(latLngToPixel);
      }
    }, [latLngToPixel, scene]),
  };
};

export const OfferMap = (props: Props) => {
  return <PixiMap {...props} useRenderer={useRenderer} />;
};
