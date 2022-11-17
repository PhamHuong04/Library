import { TypeAccess } from "../type";


export const getLocalStorage = (key: string): TypeAccess => localStorage.getItem(key);

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
