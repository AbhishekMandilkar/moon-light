import { LoggedInUser } from "@/services/appwrite";
import { Models } from "appwrite";
import { createContext } from "react";

export const AuthContext = createContext<{
  authData: LoggedInUser;
  setAuthData: (data: LoggedInUser) => void;
}>({
  setAuthData: () => {},
  authData: {} as LoggedInUser,
});

export const AuthProvider = AuthContext.Provider;

import { useContext } from "react";

const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};

export default useAuth;
