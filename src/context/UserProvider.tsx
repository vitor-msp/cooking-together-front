import React, { PropsWithChildren, createContext, useState } from "react";
import { CurrentUser, User } from "../core/domain/User";
import { loginUsecase, logoutUsecase } from "../factory";

export type UserContextType = {
  user: CurrentUser | null;
  login: (user: CurrentUser) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

const defaultUserContext: UserContextType = {
  user: null,
  login: async (user: CurrentUser) => false,
  logout: async () => false,
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<CurrentUser | null>(null);

  const login = async (user: CurrentUser) => {
    const loggedUser = await loginUsecase.execute(user);
    if (loggedUser) {
      setLoggedUser(loggedUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    return await logoutUsecase.execute();
  };

  return (
    <UserContext.Provider value={{ user: loggedUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
