import { Point } from "pigeon-maps";
import * as PIXI from "pixi.js";
import * as React from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { UsePixiRenderer } from "@/components/PixiMap";
import { querySubscriberStatus, SubscriberStatus } from "@/data/queries";
import { connectionConfig } from "@/data/recoil";
import { useConnectionState, useDebounce } from "@/view/hooks/hooks";

const REFRESH_INTERVAL = 2000; // Poll every 2 seconds
const FRESHNESS_THRESHOLD = 30; // 30 seconds

// Status dot colors
const GREEN_COLOR = 0x22c55e; // green-500 - fresh and in zone
const RED_COLOR = 0xef4444; // red-500 - stale or out of scope

class StatusDot extends PIXI.Container {
  static dotRadius = 4;

  latlng: Point;
  dot: PIXI.Graphics;
  status: "green" | "red";
  statusData: SubscriberStatus;

  constructor(statusData: SubscriberStatus) {
    super();

    this.latlng = [statusData.latitude, statusData.longitude];
    this.status = statusData.status;
    this.statusData = statusData;

    this.dot = new PIXI.Graphics();
    this.updateDotColor();
    this.addChild(this.dot);

    this.interactive = true;
    this.cursor = "pointer";
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

  updateStatus(statusData: SubscriberStatus) {
    const newStatus = statusData.status;
    if (this.status !== newStatus) {
      this.status = newStatus;
      this.updateDotColor();
    }
    this.statusData = statusData;
    this.latlng = [statusData.latitude, statusData.longitude];
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    const [x, y] = latLngToPixel(this.latlng);
    this.x = x;
    this.y = y;
  }

  getTooltipText(): string {
    const {
      cityId,
      subscriberId,
      offerId,
      statusReason,
      ageSeconds,
      isFresh,
      withinZone,
    } = this.statusData;

    const ageDisplay =
      ageSeconds < 60
        ? `${ageSeconds.toFixed(1)}s`
        : `${(ageSeconds / 60).toFixed(1)}m`;

    const reasonText = statusReason
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return [
      `Subscriber: ${subscriberId}`,
      `City: ${cityId}`,
      `Offer: ${offerId}`,
      `Status: ${this.status.toUpperCase()}`,
      `Reason: ${reasonText}`,
      `Age: ${ageDisplay}`,
      `Fresh: ${isFresh ? "Yes" : "No"}`,
      `In Zone: ${withinZone ? "Yes" : "No"}`,
    ].join("\n");
  }
}

type StatusDotsRendererData = {
  statuses: SubscriberStatus[];
};

const useStatusData = (bounds: PIXI.Rectangle): StatusDotsRendererData => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();

  const debouncedBounds = useDebounce(bounds, 300);

  const { data } = useSWR(
    initialized
      ? ["subscriber-status", config, debouncedBounds, FRESHNESS_THRESHOLD]
      : null,
    () =>
      querySubscriberStatus(config, debouncedBounds, FRESHNESS_THRESHOLD),
    {
      refreshInterval: REFRESH_INTERVAL,
      revalidateOnFocus: false,
    }
  );

  return {
    statuses: data || [],
  };
};

export const useStatusDotsRenderer: UsePixiRenderer<
  StatusDotsRendererData,
  Record<string, never>
> = () => {
  const dotsContainer = React.useRef<PIXI.Container>();
  const dots = React.useRef<Map<number, StatusDot>>(new Map());

  const initializeRenderer = React.useCallback(() => {
    const container = new PIXI.Container();
    dotsContainer.current = container;
    dots.current = new Map();
    return container;
  }, []);

  const getData = React.useCallback(
    (bounds: PIXI.Rectangle) => {
      return useStatusData(bounds);
    },
    []
  );

  const render = React.useCallback(
    (
      container: PIXI.Container,
      data: StatusDotsRendererData,
      latLngToPixel: (latlng: Point) => Point
    ) => {
      const currentDots = dots.current;
      const { statuses } = data;

      const activeSubscriberIds = new Set<number>();

      for (const statusData of statuses) {
        const subscriberId = statusData.subscriberId;
        activeSubscriberIds.add(subscriberId);

        let dot = currentDots.get(subscriberId);
        if (dot) {
          dot.updateStatus(statusData);
          dot.update(latLngToPixel);
        } else {
          dot = new StatusDot(statusData);
          dot.update(latLngToPixel);
          currentDots.set(subscriberId, dot);
          container.addChild(dot);
        }
      }

      for (const [subscriberId, dot] of currentDots.entries()) {
        if (!activeSubscriberIds.has(subscriberId)) {
          container.removeChild(dot);
          dot.destroy();
          currentDots.delete(subscriberId);
        }
      }
    },
    []
  );

  const destroy = React.useCallback(() => {
    if (dotsContainer.current) {
      for (const dot of dots.current.values()) {
        dot.destroy();
      }
      dots.current.clear();
      dotsContainer.current.destroy();
      dotsContainer.current = undefined;
    }
  }, []);

  const getTooltip = React.useCallback((target: PIXI.DisplayObject) => {
    if (target instanceof StatusDot) {
      return target.getTooltipText();
    }
    return null;
  }, []);

  return {
    initializeRenderer,
    getData,
    render,
    destroy,
    getTooltip,
  };
};
