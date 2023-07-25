import React, { PropsWithChildren, createContext, useState } from "react";
import { CurrentUser } from "../core/domain/User";
import { getLoggedUserUsecase, loginUsecase, logoutUsecase } from "../factory";

export type UserContextType = {
  getUser: () => Promise<CurrentUser | null>;
  login: (user: CurrentUser) => Promise<boolean>;
  logout: () => Promise<boolean>;
  isLoggedIn: boolean;
};

const defaultUserContext: UserContextType = {
  getUser: async () => null,
  login: async (user: CurrentUser) => false,
  logout: async () => false,
  isLoggedIn: false,
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<CurrentUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async (user: CurrentUser) => {
    const loggedUser = await loginUsecase.execute(user);
    if (loggedUser) {
      setLoggedUser(loggedUser);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    const success = await logoutUsecase.execute();
    if (success) setIsLoggedIn(false);
    return success;
  };

  const getUser = async (): Promise<CurrentUser | null> => {
    const user = await getLoggedUserUsecase.execute();
    if (user) {
      setLoggedUser(user);
      setIsLoggedIn(true);
    }
    return user;
  };

  return (
    <UserContext.Provider value={{ getUser, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
