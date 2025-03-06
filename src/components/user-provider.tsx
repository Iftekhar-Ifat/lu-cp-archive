"use client";
import { type USER } from "@/utils/types";
import { createContext, useContext } from "react";

type UserContextProps = {
  user: USER | null;
};

const UserContext = createContext<UserContextProps>({ user: null });

export const useUser = () => useContext(UserContext);

const UserProvider = ({
  user,
  children,
}: {
  user: USER | null;
  children: React.ReactNode;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
