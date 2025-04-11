"use client";

import { type User } from "@/types/types";
import { createContext, type ReactNode, useContext } from "react";

type UserContextProps = {
  user: User | null;
};

const UserContext = createContext<UserContextProps>({ user: null });

export const useUser = () => useContext(UserContext);

const UserProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
