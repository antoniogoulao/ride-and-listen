import { isNilOrEmpty } from "./utils";

type ID = number;

export interface StorageValues {
    VOLUME: number;
    RECENTLY_PLAYED: ID;
}

export const localStorageEffect = (key: keyof StorageValues) => ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key)
    if (!isNilOrEmpty(savedValue)) {
      setSelf(JSON.parse(savedValue!!));
    }
  
    onSet((newValue: unknown, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
