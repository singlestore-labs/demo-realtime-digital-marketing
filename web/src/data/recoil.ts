import { ConnectionConfig } from "@/data/client";
import { atom, AtomEffect, atomFamily, selector } from "recoil";
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

const searchParamEffect =
  (): AtomEffect<string | null> =>
  ({ setSelf, node: { key } }) => {
    const { location } = window;
    if (location) {
      const search = new URLSearchParams(location.search);
      setSelf(search.get(key));
    }
  };

export const vaporSessionId = atom({
  key: "sessionId",
  default: null,
  effects: [searchParamEffect()],
});

export const vaporBaseUrl = atom({
  key: "vaporBaseUrl",
  default: "https://vapor.labs.singlestore.com",
  effects: [searchParamEffect()],
});

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

export type VaporClusterConnectionConfig = {
  endpoint: string;
  user: string;
  password: string;
};

export const vaporConnectionConfig = selector<ConnectionConfig | undefined>({
  key: "vaporConnectionConfig",
  get: async ({ get }) => {
    const sessionId = get(vaporSessionId);
    const baseUrl = get(vaporBaseUrl);

    if (sessionId) {
      try {
        const response = await fetch(
          baseUrl + "/api/v1/vapor/connect?sessionId=" + sessionId
        );
        if (response.status === 200) {
          const data = (await response.json()) as VaporClusterConnectionConfig;

          return {
            host: data.endpoint,
            user: data.user,
            password: data.password,
            database: get(connectionDatabase),
          };
        }
      } catch (e) {
        console.log(
          `Failed to connect to vapor at ${baseUrl}, falling back to local config`
        );
      }
    }
  },
});

export const connectionConfig = selector<ConnectionConfig>({
  key: "connectionConfig",
  get: ({ get }) => {
    const vaporConfig = get(vaporConnectionConfig);
    if (vaporConfig) {
      return vaporConfig;
    }

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

export const tickDurationMs = atomFamily<number | undefined, string>({
  key: "tickDurationMs",
  default: undefined,
});
