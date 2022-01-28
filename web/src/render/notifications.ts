import { PixiRenderer } from "@/components/PixiMap";
import { NotificationTuple } from "@/data/queries";
import { NotificationSubscriber } from "@/data/useNotifications";
import "@pixi/graphics-extras";
import { easeCubicIn, easeExp, easeLinear, easeQuadOut } from "d3-ease";
import * as PIXI from "pixi.js";
import { useCallback } from "react";

type Props = {
  subscribe: (sub: NotificationSubscriber) => void;
  unsubscribe: (sub: NotificationSubscriber) => void;
};

const COLORS = [
  0x03a8a0, 0x039c4b, 0x66d313, 0xfedf17, 0xff0984, 0x21409a, 0x04adff,
  0xe48873, 0xf16623, 0xf44546,
];

export const useNotificationsRenderer = ({
  subscribe,
  unsubscribe,
}: Props): PixiRenderer =>
  useCallback(
    ({ latLngToPixel }) => {
      console.log("NotificationsRenderer: Setup");

      const scene = new PIXI.Container();

      const pulses: ((delta: number) => void)[] = [];

      const startPulse = (lon: number, lat: number) => {
        let elapsed = 0;
        const lifetime = 1.5;

        const container = new PIXI.Container();

        const markerColor = COLORS[6];
        const pulseColor = COLORS[6];

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

          if (elapsed > lifetime) {
            scene.removeChild(container);
            pulses.splice(pulses.indexOf(update), 1);
            return;
          }

          const [x, y] = latLngToPixel([lat, lon]);
          container.x = x;
          container.y = y;
        };

        update(0);
        pulses.push(update);
      };

      const handleNotifications = (newNotifications: NotificationTuple[]) => {
        for (const [, , lon, lat] of newNotifications) {
          startPulse(lon, lat);
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
    [subscribe, unsubscribe]
  );
