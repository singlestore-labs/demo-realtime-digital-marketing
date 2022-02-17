import { UsePixiRenderer } from "@/components/PixiMap";
import { useConnectionState, useTick } from "@/data/hooks";
import { queryNotificationsInBounds } from "@/data/queries";
import { connectionConfig, simulatorEnabled } from "@/data/recoil";
import { easeCubicIn, easeExp, easeLinear, easeQuadOut } from "d3-ease";
import { Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback, useRef } from "react";
import { useRecoilValue } from "recoil";

const MAX_NOTIFICATIONS = 100;

class Pulse extends PIXI.Container {
  static lifetime = 1.5;
  static markerColor = 0x04adff;
  static pulseColor = 0x04adff;

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

  update(latLngToPixel: (latlng: Point) => Point, delta: number): boolean {
    this.age += delta / 60;

    if (this.age > Pulse.lifetime && this.parent) {
      return false;
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

    return true;
  }
}

export const useNotificationsRenderer: UsePixiRenderer = ({
  scene,
  latLngToPixel,
  getBounds,
}) => {
  const timestampCursor = useRef(new Date().toISOString());

  const config = useRecoilValue(connectionConfig);
  const tick = useCallback(
    async (ctx: AbortController) => {
      const cfgWithCtx = { ...config, ctx };
      const bounds = getBounds();
      if (!bounds) {
        return;
      }
      const newNotifications = await queryNotificationsInBounds(
        cfgWithCtx,
        timestampCursor.current,
        MAX_NOTIFICATIONS,
        bounds
      );
      if (newNotifications.length > 0) {
        timestampCursor.current =
          newNotifications[newNotifications.length - 1][0];

        for (const [, , lng, lat] of newNotifications) {
          scene.addChild(new Pulse([lat, lng]));
        }
      }
    },
    [config, getBounds, scene]
  );

  const enabled = useRecoilValue(simulatorEnabled);
  const { initialized } = useConnectionState();
  useTick(tick, {
    name: "Notifications",
    enabled: initialized && enabled,
    intervalMS: 1000,
  });

  return {
    update: useCallback(
      (delta) => {
        const toRemove = [];
        for (let i = 0; i < scene.children.length; i++) {
          const pulse = scene.children[i] as Pulse;
          if (!pulse.update(latLngToPixel, delta)) {
            toRemove.push(pulse);
          }
        }
        scene.removeChild(...toRemove);
      },
      [latLngToPixel, scene]
    ),
  };
};
