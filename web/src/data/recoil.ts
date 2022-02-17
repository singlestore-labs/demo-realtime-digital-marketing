import { ConnectionConfig } from "@/data/client";
import { atom, AtomEffect, selector } from "recoil";
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
  effects: [localStorageEffect()],
});

export const connectionUser = atom({
  key: "connectionUser",
  default: "root",
  effects: [localStorageEffect()],
});

export const connectionPassword = atom({
  key: "connectionPassword",
  default: "",
  effects: [localStorageEffect()],
});

export const connectionDatabase = atom({
  key: "connectionDatabase",
  default: "s2cellular",
  effects: [localStorageEffect()],
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
  effects: [localStorageEffect()],
});

export const simulatorEnabled = atom<boolean>({
  key: "simulatorEnabled",
  default: true,
  effects: [localStorageEffect()],
});

export const databaseDrawerIsOpen = atom({
  key: "databaseDrawerIsOpen",
  default: false,
});
