import * as PIXI from "pixi.js";
import * as React from "react";

import { UsePixiRenderer } from "@/components/PixiMap";
import { useNotificationsRenderer } from "@/render/useNotificationsRenderer";
import { useStatusDotsRenderer } from "@/render/useStatusDotsRenderer";

/**
 * Combined renderer that layers notification pulses and status dots.
 * Notifications render on top of status dots.
 */
export const useCombinedRenderer: UsePixiRenderer = (config) => {
  // Create separate scenes for layering
  const statusScene = React.useMemo(() => new PIXI.Container(), []);
  const notificationsScene = React.useMemo(() => new PIXI.Container(), []);

  // Add both scenes to the main scene
  React.useEffect(() => {
    config.scene.addChild(statusScene);
    config.scene.addChild(notificationsScene);

    return () => {
      config.scene.removeChild(statusScene);
      config.scene.removeChild(notificationsScene);
    };
  }, [config.scene, statusScene, notificationsScene]);

  // Initialize both renderers with their own scenes
  const statusRenderer = useStatusDotsRenderer({
    ...config,
    scene: statusScene,
  });

  const notificationsRenderer = useNotificationsRenderer({
    ...config,
    scene: notificationsScene,
  });

  return {
    setup: () => {
      statusRenderer.setup?.();
      notificationsRenderer.setup?.();
    },
    update: (delta: number) => {
      statusRenderer.update?.(delta);
      notificationsRenderer.update?.(delta);
    },
  };
};
