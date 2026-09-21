import * as PIXI from "pixi.js";
import * as React from "react";

import { UsePixiRenderer } from "@/components/PixiMap";
import { useNotificationsRenderer } from "@/render/useNotificationsRenderer";
import { useStatusDotsRenderer } from "@/render/useStatusDotsRenderer";

export const useCombinedRenderer: UsePixiRenderer = (config) => {
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

  const statusRenderer = useStatusDotsRenderer({
    ...config,
    scene: statusScene,
  });

  const notificationsRenderer = useNotificationsRenderer({
    ...config,
    scene: notificationsScene,
  });

  const setup = React.useCallback(() => {
    statusRenderer.setup?.();
    notificationsRenderer.setup?.();
  }, [statusRenderer, notificationsRenderer]);

  const update = React.useCallback(
    (delta: number) => {
      statusRenderer.update?.(delta);
      notificationsRenderer.update?.(delta);
    },
    [statusRenderer, notificationsRenderer]
  );

  return { setup, update };
};
