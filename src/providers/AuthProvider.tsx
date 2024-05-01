"use client";
import { AuthUserType } from "@/lib/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  user: AuthUserType;
  setRefetchUser: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<ContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType>({ email: "", role: "" });
  const [refetchUser, setRefetchUser] = useState<boolean>(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch("/api/auth/currentUser", {
        credentials: "include",
      });

      const result = await response.json();
      setUser(result);
      console.log(result);
    };

    getCurrentUser();
  }, []);

  const value = {
    user,
    setRefetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
