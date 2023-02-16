import { easeCubicIn, easeExp, easeLinear, easeQuadOut } from "d3-ease";
import { Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { trackAnalyticsEvent } from "@/analytics";
import { UsePixiRenderer } from "@/components/PixiMap";
import { City, getCities, queryNotificationsInBounds } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { toISOStringNoTZ } from "@/datetime";
import { useConnectionState, useDebounce } from "@/view/hooks/hooks";

const MAX_NOTIFICATIONS = 100;
const REFRESH_INTERVAL = 1000;

class Pulse extends PIXI.Container {
  static lifetime = 1.5;
  static markerColor = 0x553acf;
  static pulseColor = 0x553acf;

  latlng: Point;
  age = 0;
  marker: PIXI.Graphics;
  pulse: PIXI.Graphics;

  constructor(latlng: Point) {
    super();

    this.latlng = latlng;

    this.marker = new PIXI.Graphics();
    this.marker.beginFill(Pulse.markerColor).drawCircle(0, 0, 5).endFill();
    this.addChild(this.marker);

    this.pulse = new PIXI.Graphics();
    this.pulse.beginFill(Pulse.pulseColor);
    if (this.pulse.drawTorus) {
      this.pulse.drawTorus(0, 0, 4, 6);
    }
    this.pulse.endFill();
    this.addChild(this.pulse);
  }

  update(latLngToPixel: (latlng: Point) => Point, delta: number) {
    this.age += delta / 60;

    if (this.age > Pulse.lifetime && this.parent) {
      this.parent.removeChild(this);
      return;
    }

    const t = (this.age % Pulse.lifetime) / Pulse.lifetime;

    const eased = easeQuadOut(t);
    this.pulse.scale.set(1 + eased);

    const cutoff = 0.4;
    const alphaEase =
      t < cutoff
        ? easeCubicIn(t / cutoff)
        : 1 - easeLinear((t - cutoff) / (1 - cutoff));
    this.pulse.alpha = alphaEase;

    if (t < cutoff) {
      this.marker.alpha = alphaEase;
    } else {
      this.marker.alpha = 1 - easeExp((t - cutoff) / (1 - cutoff));
    }

    const [x, y] = latLngToPixel(this.latlng);
    this.x = x;
    this.y = y;
  }
}

export const useNotificationsDataKey = () => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  return useMemo(
    () => ["notifications", config, initialized],
    [config, initialized]
  );
};

export const useCities = (onSuccess: (cities: City[]) => void) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  return useSWR(["cities", config, initialized], () => getCities(config), {
    isPaused: () => !initialized,
    onSuccess,
  });
};

export const useNotificationsRenderer: UsePixiRenderer = ({
  scene,
  latLngToPixel,
  bounds,
}) => {
  const timestampCursor = useRef(toISOStringNoTZ(new Date()));
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  const debouncedBounds = useDebounce(bounds, 50);
  const swrKey = useNotificationsDataKey();
  const trackedNotifications = useRef(false);

  useSWR(
    swrKey,
    () =>
      queryNotificationsInBounds(
        config,
        timestampCursor.current,
        MAX_NOTIFICATIONS,
        debouncedBounds
      ),
    {
      refreshInterval: REFRESH_INTERVAL,
      isPaused: () => !initialized,
      onSuccess: (newNotifications) => {
        if (newNotifications.length > 0) {
          // we just want to log new notications once to avoid a lot of noise
          if (!trackedNotifications.current) {
            trackAnalyticsEvent("new-notifications");
            trackedNotifications.current = true;
          }
          timestampCursor.current = newNotifications[0][0];

          for (const [, lng, lat] of newNotifications) {
            scene.addChild(new Pulse([lat, lng]));
          }
        }
      },
    }
  );

  return {
    update: useCallback(
      (delta) => {
        // iterate in reverse since Pulses remove themselves when invisible
        for (let i = scene.children.length - 1; i >= 0; i--) {
          const child = scene.children[i] as Pulse;
          child.update(latLngToPixel, delta);
        }
      },
      [latLngToPixel, scene]
    ),
  };
};
