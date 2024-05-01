import { AuthUserType } from "@/lib/types";
import { ReactNode, createContext, useState } from "react";

const AuthContext = createContext<AuthUserType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserType>();

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
