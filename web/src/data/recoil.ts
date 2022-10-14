import { ConnectionConfig } from "@/data/client";
import { atom, AtomEffect, atomFamily, DefaultValue, selector } from "recoil";
import { defaultScaleFactor, ScaleFactor, ScaleFactors } from "../scalefactors";

type LocalStorageEffectConfig<T> = {
  encode: (v: T) => string;
  decode: (v: string) => T;
};

const localStorageEffect =
  <T>(
    { encode, decode }: LocalStorageEffectConfig<T> = {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
  ): AtomEffect<T> =>
  ({ setSelf, onSet, node }) => {
    const key = `recoil.localstorage.${node.key}`;
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(decode(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, encode(newValue));
    });
  };

const searchParamEffect =
  (): AtomEffect<string | null> =>
  ({ setSelf, node: { key } }) => {
    const { location } = window;
    if (location) {
      const search = new URLSearchParams(location.search);
      setSelf(search.get(key) || new DefaultValue());
    }
  };

export const vaporSessionId = atom({
  key: "sessionID",
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
  default: "martech",
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
    const sessionID = get(vaporSessionId);
    const baseUrl = get(vaporBaseUrl);

    if (sessionID && baseUrl) {
      try {
        const response = await fetch(
          baseUrl + "/api/v1/connect?sessionID=" + sessionID
        );
        if (response.status === 200) {
          const data = (await response.json()) as VaporClusterConnectionConfig;

          return {
            host: "https://" + data.endpoint,
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
  default: defaultScaleFactor,
  effects: [
    localStorageEffect({
      encode: (v: ScaleFactor) => v.name,
      decode: (v: string) =>
        ScaleFactors.find((sf) => sf.name === v) || defaultScaleFactor,
    }),
  ],
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

export const resettingSchema = atom({
  key: "resettingSchema",
  default: false,
});
