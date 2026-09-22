import * as PIXI from "pixi.js";
import * as React from "react";

import { UsePixiRenderer } from "@/components/PixiMap";
import { useNotificationsRenderer } from "@/render/useNotificationsRenderer";
import { useStatusDotsRenderer } from "@/render/useStatusDotsRenderer";

export type CombinedRendererOptions = {
  showNotifications?: boolean;
  showStatusDots?: boolean;
};

export const useCombinedRenderer: UsePixiRenderer<CombinedRendererOptions> = (config) => {
  const { showNotifications = true, showStatusDots = true } = config.options;

  const statusScene = React.useMemo(() => new PIXI.Container(), []);
  const notificationsScene = React.useMemo(() => new PIXI.Container(), []);

  React.useEffect(() => {
    config.scene.addChild(statusScene);
    config.scene.addChild(notificationsScene);

    return () => {
      config.scene.removeChild(statusScene);
      config.scene.removeChild(notificationsScene);
    };
  }, [config.scene, statusScene, notificationsScene]);

  React.useEffect(() => {
    statusScene.visible = showStatusDots;
  }, [statusScene, showStatusDots]);

  React.useEffect(() => {
    notificationsScene.visible = showNotifications;
  }, [notificationsScene, showNotifications]);

  const statusRenderer = useStatusDotsRenderer({
    ...config,
    scene: statusScene,
  });

  const notificationsRenderer = useNotificationsRenderer({
    ...config,
    scene: notificationsScene,
  });

  return {
    update: React.useCallback(
      (delta: number) => {
        statusRenderer.update?.(delta);
        notificationsRenderer.update?.(delta);
      },
      [statusRenderer.update, notificationsRenderer.update]
    ),
  };
};
