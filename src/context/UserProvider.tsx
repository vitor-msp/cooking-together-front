import React, { PropsWithChildren, createContext } from "react";
import { User } from "../domain/User";

export type UserContextType = {
  user: User | null;
};

const defaultUserContext: UserContextType = {
  user: {
    id: "1",
    name: "fulano de tal",
  },
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserContext.Provider value={{ user: defaultUserContext.user }}>
      {children}
    </UserContext.Provider>
  );
};
