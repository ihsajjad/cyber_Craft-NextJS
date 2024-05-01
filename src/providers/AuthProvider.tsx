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
  setUser: Dispatch<SetStateAction<AuthUserType>>;
  setRefetchUser: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export const AuthContext = createContext<ContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType>({ email: "", role: "" });
  const [refetchUser, setRefetchUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      const response = await fetch("/api/auth/currentUser", {
        credentials: "include",
      });

      const result = await response.json();
      setUser(result);
      setLoading(false);
      console.log(result);
    };

    getCurrentUser();
  }, [refetchUser]);

  const value = {
    user,
    setRefetchUser,
    loading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
