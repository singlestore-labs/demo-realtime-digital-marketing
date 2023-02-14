import { atom, AtomEffect, atomFamily, DefaultValue, selector } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { trackAnalyticsEvent } from "@/analytics";
import { ConnectionConfig } from "@/data/client";

import { defaultScaleFactor, ScaleFactor, ScaleFactors } from "../scalefactors";
import { City } from "./queries";

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
  (searchParam: string): AtomEffect<string | null> =>
  ({ setSelf }) => {
    const { location } = window;
    if (location) {
      const search = new URLSearchParams(location.search);
      setSelf(search.get(searchParam) || new DefaultValue());
    }
  };

export const userSessionID = atom({
  key: "userID",
  default: uuidv4(),
  effects: [localStorageEffect()],
});

export const selectedCity = atom({
  key: "selectedCity",
  default: -1,
  effects: [],
});

export const selectedCities = atom<Array<City>>({
  key: "selectedCities",
  default: [],
});

export const isUpdatingCities = atom({
  key: "isUpdatingCities",
  default: false,
});

export const errorUpdatingCities = atom<Error | undefined>({
  key: "errorUpdatingCities",
  default: undefined,
});

export const connectionHost = atom({
  key: "connectionHost",
  default: "http://127.0.0.1",
  effects: [localStorageEffect()],
});

export const connectionUser = atom({
  key: "connectionUser",
  default: "admin",
  effects: [localStorageEffect()],
});

export const connectionPassword = atom({
  key: "connectionPassword",
  default: "",
  effects: [localStorageEffect()],
});

export const redirectToHomaPage = atom({
  key: "redirectToHomePage",
  default: true,
});

export const connectionDatabase = atom({
  key: "connectionDatabase",
  default: "martech",
  effects: [localStorageEffect()],
});

export const portalDatabase = atom({
  key: "portalDatabase",
  default: "martech",
  effects: [searchParamEffect("database")],
});

export const portalHostname = atom({
  key: "portalHostname",
  default: null,
  effects: [searchParamEffect("hostname")],
});

export const portalCredentials = atom({
  key: "portalCredentials",
  default: null,
  effects: [searchParamEffect("credentials")],
});

export const portalConnectionConfig = selector<ConnectionConfig | undefined>({
  key: "portalConnectionConfig",
  get: async ({ get }) => {
    const portalHostnameValue = get(portalHostname);
    const portalCredentialsValue = get(portalCredentials);
    const portalDatabaseValue = get(portalDatabase);

    if (portalCredentialsValue) {
      let decodedCredentials;
      try {
        decodedCredentials = window.atob(portalCredentialsValue);
      } catch (e) {
        console.log(
          "Failed to decode Portal credentials, falling back to local config."
        );
      }
      if (portalHostnameValue && decodedCredentials && portalDatabaseValue) {
        const { username, password } = JSON.parse(decodedCredentials);
        if (username && password) {
          return {
            host: "https://" + portalHostnameValue,
            user: username,
            password: password,
            database: portalDatabaseValue,
          };
        }
      }
    }
  },
});

export const connectionConfig = selector<ConnectionConfig>({
  key: "connectionConfig",
  get: ({ get }) => {
    const portalConfig = get(portalConnectionConfig);
    if (portalConfig) {
      trackAnalyticsEvent("portal-connection");
      return portalConfig;
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
