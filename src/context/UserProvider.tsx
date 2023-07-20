import React, { PropsWithChildren, createContext, useState } from "react";
import { CurrentUser, User } from "../domain/User";

export type UserContextType = {
  user: CurrentUser | null;
  login: (user: CurrentUser) => void;
};

const defaultUserContext: UserContextType = {
  user: null,
  login: (user: CurrentUser) => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<CurrentUser | null>(null);

  const login = (user: CurrentUser) => {
    setLoggedUser({
      id: "1",
      name: "fulano de tal",
      email: "fulano@gmail.com",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <UserContext.Provider value={{ user: loggedUser, login }}>
      {children}
    </UserContext.Provider>
  );
};
