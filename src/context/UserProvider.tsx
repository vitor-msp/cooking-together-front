import React, { PropsWithChildren, createContext, useState } from "react";
import { CurrentUser, User } from "../core/domain/User";
import { loginUsecase } from "../factory";

export type UserContextType = {
  user: CurrentUser | null;
  login: (user: CurrentUser) => Promise<boolean>;
};

const defaultUserContext: UserContextType = {
  user: null,
  login: async (user: CurrentUser) => false,
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

  return (
    <UserContext.Provider value={{ user: loggedUser, login }}>
      {children}
    </UserContext.Provider>
  );
};
