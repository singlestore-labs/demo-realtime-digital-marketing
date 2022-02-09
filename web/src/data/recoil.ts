import { ConnectionConfig } from "@/data/client";
import { NotificationTuple } from "@/data/queries";
import { Bounds } from "pigeon-maps";
import { atom, AtomEffect, DefaultValue, selector } from "recoil";
import { ScaleFactor } from "../scalefactors";

const localStorageEffect =
  <T>(): AtomEffect<T> =>
  ({ setSelf, onSet, node }) => {
    const key = `recoil.localstorage.${node.key}`;
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const connectionHost = atom({
  key: "connectionHost",
  default: "http://127.0.0.1",
  effects_UNSTABLE: [localStorageEffect()],
});

export const connectionUser = atom({
  key: "connectionUser",
  default: "root",
  effects_UNSTABLE: [localStorageEffect()],
});

export const connectionPassword = atom({
  key: "connectionPassword",
  default: "",
  effects_UNSTABLE: [localStorageEffect()],
});

export const connectionDatabase = atom({
  key: "connectionDatabase",
  default: "s2cellular",
  effects_UNSTABLE: [localStorageEffect()],
});

export const connectionConfig = selector<ConnectionConfig>({
  key: "connectionConfig",
  get: ({ get }) => {
    const host = get(connectionHost);
    const user = get(connectionUser);
    const password = get(connectionPassword);
    const database = get(connectionDatabase);
    return { host, user, password, database };
  },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

export const configScaleFactor = atom<ScaleFactor>({
  key: "configScaleFactor",
  default: "small",
  effects_UNSTABLE: [localStorageEffect()],
});

export const simulatorEnabled = atom<boolean>({
  key: "simulatorEnabled",
  default: true,
  effects_UNSTABLE: [localStorageEffect()],
});

export const MAX_NOTIFICATIONS = 100;

export const notificationsBuffer = atom<NotificationTuple[]>({
  key: "notificationsBuffer",
  default: [],
});

export const notifications = selector<NotificationTuple[]>({
  key: "notifications",
  get: ({ get }) => get(notificationsBuffer),
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return set(notificationsBuffer, []);
    }
    const buffer = get(notificationsBuffer);
    const newBuffer = [...buffer, ...newValue];
    if (newBuffer.length > MAX_NOTIFICATIONS) {
      newBuffer.splice(0, newBuffer.length - MAX_NOTIFICATIONS);
    }
    set(notificationsBuffer, newBuffer);
  },
  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

export const mapBounds = atom<Bounds | undefined>({
  key: "mapBounds",
  default: undefined,
});

export const databaseDrawerIsOpen = atom({
  key: "databaseDrawerIsOpen",
  default: false,
});
