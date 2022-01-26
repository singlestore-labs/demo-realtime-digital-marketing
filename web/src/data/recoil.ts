import { atom, AtomEffect, selector } from "recoil";

const localStorageEffect: AtomEffect<string> = ({ setSelf, onSet, node }) => {
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
  effects_UNSTABLE: [localStorageEffect],
});

export const connectionUser = atom({
  key: "connectionUser",
  default: "root",
  effects_UNSTABLE: [localStorageEffect],
});

export const connectionPassword = atom({
  key: "connectionPassword",
  default: "",
  effects_UNSTABLE: [localStorageEffect],
});

export const connectionDatabase = atom({
  key: "connectionDatabase",
  default: "s2cellular",
  effects_UNSTABLE: [localStorageEffect],
});

export const connectionConfig = selector({
  key: "connectionConfig",
  get: ({ get }) => {
    const host = get(connectionHost);
    const user = get(connectionUser);
    const password = get(connectionPassword);
    const database = get(connectionDatabase);
    return { host, user, password, database };
  },
});
