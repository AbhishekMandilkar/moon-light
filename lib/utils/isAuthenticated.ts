import { LOCAL_STORAGE_KEY } from "../constants/common.constants";

export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.getItem(LOCAL_STORAGE_KEY);
    return false;
  }
  return false;
};
