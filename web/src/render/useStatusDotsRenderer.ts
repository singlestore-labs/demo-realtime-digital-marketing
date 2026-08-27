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
const FRESHNESS_THRESHOLD = 600; // 600 seconds (10 minutes) for testing - change back to 30 for production

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

    // Make interactive for tooltips
    this.interactive = true;
    this.cursor = "pointer";
  }

  updateDotColor() {
    const color = this.status === "green" ? GREEN_COLOR : RED_COLOR;
    this.dot.clear();
    this.dot.beginFill(color);
    this.dot.drawCircle(0, 0, StatusDot.dotRadius);
    this.dot.endFill();
    // Add a white border for better visibility
    this.dot.lineStyle(1, 0xffffff, 0.8);
    this.dot.drawCircle(0, 0, StatusDot.dotRadius);
  }

  updateStatus(statusData: SubscriberStatus) {
    const newStatus = statusData.status;
    if (this.status !== newStatus) {
      this.status = newStatus;
      this.statusData = statusData;
      this.updateDotColor();
    } else {
      this.statusData = statusData;
    }
  }

  update(latLngToPixel: (latlng: Point) => Point) {
    const [x, y] = latLngToPixel(this.latlng);
    this.x = x;
    this.y = y;
  }

  getTooltipText(): string {
    const { cityId, subscriberId, offerId, statusReason, ageSeconds, isFresh, withinZone } =
      this.statusData;

    const ageDisplay = ageSeconds < 60
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

export const useStatusDotsRenderer: UsePixiRenderer = ({
  scene,
  latLngToPixel,
  bounds,
}) => {
  const config = useRecoilValue(connectionConfig);
  const { initialized } = useConnectionState();
  const debouncedBounds = useDebounce(bounds, 200);

  // Keep track of existing dots by unique key
  const dotsMap = React.useRef<Map<string, StatusDot>>(new Map());

  // Tooltip text element
  const tooltipText = React.useRef<PIXI.Text | null>(null);
  const tooltipBackground = React.useRef<PIXI.Graphics | null>(null);

  // Initialize tooltip
  React.useEffect(() => {
    const text = new PIXI.Text("", {
      fontFamily: "monospace",
      fontSize: 12,
      fill: 0xffffff,
      align: "left",
    });
    text.visible = false;
    scene.addChild(text);
    tooltipText.current = text;

    const bg = new PIXI.Graphics();
    bg.visible = false;
    scene.addChild(bg);
    tooltipBackground.current = bg;

    return () => {
      if (tooltipText.current) {
        scene.removeChild(tooltipText.current);
        tooltipText.current.destroy();
      }
      if (tooltipBackground.current) {
        scene.removeChild(tooltipBackground.current);
        tooltipBackground.current.destroy();
      }
    };
  }, [scene]);

  useSWR(
    ["subscriberStatus", config, initialized, debouncedBounds],
    () => querySubscriberStatus(config, debouncedBounds, FRESHNESS_THRESHOLD),
    {
      refreshInterval: REFRESH_INTERVAL,
      isPaused: () => !initialized,
      onSuccess: (statuses) => {
        const currentKeys = new Set<string>();

        for (const status of statuses) {
          // Create unique key for each subscriber-offer pair
          const key = `${status.cityId}-${status.subscriberId}-${status.offerId}`;
          currentKeys.add(key);

          const existingDot = dotsMap.current.get(key);
          if (existingDot) {
            // Update existing dot
            existingDot.updateStatus(status);
          } else {
            // Create new dot
            const dot = new StatusDot(status);

            // Add hover handlers
            dot.on("pointerover", () => {
              if (tooltipText.current && tooltipBackground.current) {
                tooltipText.current.text = dot.getTooltipText();
                tooltipText.current.visible = true;
                tooltipBackground.current.visible = true;
              }
            });

            dot.on("pointerout", () => {
              if (tooltipText.current && tooltipBackground.current) {
                tooltipText.current.visible = false;
                tooltipBackground.current.visible = false;
              }
            });

            scene.addChild(dot);
            dotsMap.current.set(key, dot);
          }
        }

        // Remove dots that are no longer in the result set
        for (const [key, dot] of dotsMap.current.entries()) {
          if (!currentKeys.has(key)) {
            scene.removeChild(dot);
            dot.destroy();
            dotsMap.current.delete(key);
          }
        }
      },
    }
  );

  return {
    update: React.useCallback(
      () => {
        // Update positions for all dots
        for (const dot of dotsMap.current.values()) {
          dot.update(latLngToPixel);
        }

        // Update tooltip position if visible
        if (tooltipText.current?.visible && tooltipBackground.current) {
          const padding = 8;
          const bg = tooltipBackground.current;
          const text = tooltipText.current;

          // Position tooltip near the mouse (you'd need to track mouse position)
          // For now, position it at top-right of the text
          bg.clear();
          bg.beginFill(0x000000, 0.8);
          bg.drawRoundedRect(
            text.x - padding,
            text.y - padding,
            text.width + padding * 2,
            text.height + padding * 2,
            4
          );
          bg.endFill();
        }
      },
      [latLngToPixel]
    ),
  };
};
