import { useConnectionState, useTick } from "@/data/hooks";
import { NotificationTuple, queryNotifications } from "@/data/queries";
import {
  connectionConfig,
  MAX_NOTIFICATIONS,
  notifications,
  simulatorEnabled,
} from "@/data/recoil";
import { useCallback, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const TICK_INTERVAL = 1 * 1000;

/*
  - map renders notifications as pings which decay
  - notification list view renders notifications as a stream of locations and offer ids
    - hovering a notification queries for details on the notification
    - clicking a notification jumps the map to the notification
      - re-pings the map with potentially a different color?
*/

export type NotificationSubscriber = (newNotifications: NotificationTuple[]) => void;

const useNotificationEmitter = () => {
  const subscriberRef = useRef<NotificationSubscriber>();

  return {
    subscribe: useCallback((sub: NotificationSubscriber) => {
      if (subscriberRef.current) {
        throw new Error("NotificationEmitter already subscribed");
      }
      subscriberRef.current = sub;
    }, []),

    unsubscribe: useCallback((sub: NotificationSubscriber) => {
      if (subscriberRef.current === sub) {
        subscriberRef.current = undefined;
      }
    }, []),

    emit: useCallback((newNotifications: NotificationTuple[]) => {
      if (subscriberRef.current) {
        subscriberRef.current(newNotifications);
      }
    }, []),
  };
};

export const useNotifications = () => {
  const config = useRecoilValue(connectionConfig);
  const enabled = useRecoilValue(simulatorEnabled);
  const { initialized } = useConnectionState();
  const timestampCursor = useRef("");
  const setNotifications = useSetRecoilState(notifications);
  const { subscribe, unsubscribe, emit } = useNotificationEmitter();

  const tick = useCallback(
    async (ctx: AbortController) => {
      const cfgWithCtx = { ...config, ctx };
      const newNotifications = await queryNotifications(
        cfgWithCtx,
        timestampCursor.current,
        MAX_NOTIFICATIONS
      );
      if (newNotifications.length > 0) {
        timestampCursor.current = newNotifications[0][0];
        setNotifications(newNotifications);
        emit(newNotifications);
      }
    },
    [config, setNotifications, emit]
  );

  useTick(tick, {
    name: "Notifications",
    enabled: initialized && enabled,
    intervalMS: TICK_INTERVAL,
  });

  return { subscribe, unsubscribe };
};
