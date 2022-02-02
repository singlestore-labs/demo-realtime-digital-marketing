import { PixiRenderer } from "@/components/PixiMap";
import { NotificationTuple } from "@/data/queries";
import { mapBounds } from "@/data/recoil";
import { NotificationSubscriber } from "@/data/useNotifications";
import "@pixi/graphics-extras";
import { easeCubicIn, easeExp, easeLinear, easeQuadOut } from "d3-ease";
import { Bounds } from "pigeon-maps";
import * as PIXI from "pixi.js";
import { useCallback } from "react";
import { useRecoilCallback } from "recoil";

type Props = {
  subscribe: (sub: NotificationSubscriber) => void;
  unsubscribe: (sub: NotificationSubscriber) => void;
};

export const useNotificationsRenderer = ({
  subscribe,
  unsubscribe,
}: Props): PixiRenderer => {
  const getBounds = useRecoilCallback(
    ({ snapshot }) =>
      () =>
        snapshot.getPromise(mapBounds)
  );

  return useCallback(
    ({ latLngToPixel }) => {
      console.log("NotificationsRenderer: Setup");

      const scene = new PIXI.Container();

      const pulses: ((delta: number) => void)[] = [];

      const startPulse = (lon: number, lat: number) => {
        let elapsed = 0;
        const lifetime = 1.5;

        const container = new PIXI.Container();

        const markerColor = 0x04adff;
        const pulseColor = 0x04adff;

        const marker = new PIXI.Graphics();
        marker.beginFill(markerColor).drawCircle(0, 0, 5).endFill();
        container.addChild(marker);

        const pulse = new PIXI.Graphics();
        pulse.beginFill(pulseColor);
        if (pulse.drawTorus) {
          pulse.drawTorus(0, 0, 4, 6);
        }
        pulse.endFill();
        container.addChild(pulse);

        scene.addChild(container);

        const update = (delta: number) => {
          elapsed += delta / 60;

          if (elapsed > lifetime) {
            scene.removeChild(container);
            pulses.splice(pulses.indexOf(update), 1);
            return;
          }

          const t = (elapsed % lifetime) / lifetime;

          const eased = easeQuadOut(t);
          pulse.scale.set(1 + eased);

          const cutoff = 0.4;
          const alphaEase =
            t < cutoff
              ? easeCubicIn(t / cutoff)
              : 1 - easeLinear((t - cutoff) / (1 - cutoff));
          pulse.alpha = alphaEase;

          if (t < cutoff) {
            marker.alpha = alphaEase;
          } else {
            marker.alpha = 1 - easeExp((t - cutoff) / (1 - cutoff));
          }

          const [x, y] = latLngToPixel([lat, lon]);
          container.x = x;
          container.y = y;
        };

        update(0);
        pulses.push(update);
      };

      const boundsContains = (bounds: Bounds, lat: number, lng: number) => {
        return (
          lat <= bounds.ne[0] &&
          lng <= bounds.ne[1] &&
          lat >= bounds.sw[0] &&
          lng >= bounds.sw[1]
        );
      };

      const handleNotifications = async (
        newNotifications: NotificationTuple[]
      ) => {
        const bounds = await getBounds();
        for (const [, , lon, lat] of newNotifications) {
          if (!bounds || boundsContains(bounds, lat, lon)) {
            startPulse(lon, lat);
          }
        }
      };
      subscribe(handleNotifications);

      return {
        scene,
        draw(delta) {
          for (const pulse of pulses) {
            pulse(delta);
          }
        },
        destroy() {
          console.log("NotificationsRenderer: Destroy");
          unsubscribe(handleNotifications);
        },
      };
    },
    [getBounds, subscribe, unsubscribe]
  );
};
