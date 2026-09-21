import { Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import * as React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { UsePixiRenderer } from "@/components/PixiMap";
import { querySubscriberStatus, SubscriberStatus } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { useConnectionState, useDebounce } from "@/view/hooks/hooks";

const REFRESH_INTERVAL = 2000;
const FRESHNESS_THRESHOLD = 30;

const GREEN_COLOR = 0x22c55e;
const RED_COLOR = 0xef4444;

class StatusDot extends PIXI.Container {
  static dotRadius = 4;

  latlng: Point;
  dot: PIXI.Graphics;
  status: "green" | "red";
  subscriberId: number;

  constructor(status: SubscriberStatus) {
    super();

    this.latlng = [status.latitude, status.longitude];
    this.status = status.status;
    this.subscriberId = status.subscriberId;

    this.dot = new PIXI.Graphics();
    this.updateDotColor();
    this.addChild(this.dot);
  }

  updateDotColor() {
    const color = this.status === "green" ? GREEN_COLOR : RED_COLOR;
    this.dot.clear();
    this.dot.beginFill(color);
    this.dot.drawCircle(0, 0, StatusDot.dotRadius);
    this.dot.endFill();
    this.dot.lineStyle(1, 0xffffff, 0.8);
    this.dot.drawCircle(0, 0, StatusDot.dotRadius);
  }

  updateStatus(newStatus: "green" | "red") {
    if (this.status !== newStatus) {
      this.status = newStatus;
      this.updateDotColor();
    }
  }

  updatePosition(latlng: Point) {
    this.latlng = latlng;
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    const [x, y] = latLngToPixel(this.latlng);
    this.x = x;
    this.y = y;
  }
}

export const useStatusDotsRenderer: UsePixiRenderer = ({
  scene,
  latLngToPixel,
  bounds,
}) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  const debouncedBounds = useDebounce(bounds, 300);

  const dots = React.useRef<Map<number, StatusDot>>(new Map());

  useSWR(
    initialized ? ["subscriber-status", config, debouncedBounds, FRESHNESS_THRESHOLD] : null,
    () => querySubscriberStatus(config, debouncedBounds, FRESHNESS_THRESHOLD),
    {
      refreshInterval: REFRESH_INTERVAL,
      isPaused: () => !initialized,
      onSuccess: (statuses) => {
        if (!statuses) return;

        const currentDots = dots.current;
        const activeSubscriberIds = new Set<number>();

        for (const status of statuses) {
          activeSubscriberIds.add(status.subscriberId);

          let dot = currentDots.get(status.subscriberId);
          if (dot) {
            dot.updateStatus(status.status);
            dot.updatePosition([status.latitude, status.longitude]);
          } else {
            dot = new StatusDot(status);
            currentDots.set(status.subscriberId, dot);
            scene.addChild(dot);
          }
        }

        for (const [subscriberId, dot] of currentDots.entries()) {
          if (!activeSubscriberIds.has(subscriberId)) {
            scene.removeChild(dot);
            dot.destroy();
            currentDots.delete(subscriberId);
          }
        }
      },
      onError: (error) => {
        if (error.name === "AbortError") {
          return;
        }
        console.warn("Failed to fetch subscriber status:", error);
      },
      shouldRetryOnError: false,
    }
  );

  return {
    update: React.useCallback(
      (delta) => {
        for (const dot of dots.current.values()) {
          dot.update(latLngToPixel);
        }
      },
      [latLngToPixel]
    ),
  };
};
