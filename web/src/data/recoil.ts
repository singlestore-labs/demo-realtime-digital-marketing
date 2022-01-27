import { ConnectionConfig } from "@/data/client";
import { atom, AtomEffect, selector } from "recoil";

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
});

export const ScaleFactors = {
  small: { maxRows: 1000000 },
  large: { maxRows: 1000000000 },
};
export type ScaleFactor = keyof typeof ScaleFactors;

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
