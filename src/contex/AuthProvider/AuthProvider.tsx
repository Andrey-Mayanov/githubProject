import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export type AuthContextType = {
  user: { name: string; avatar_url: string; login: string } | null;
  setUser: Dispatch<SetStateAction<null>>;
};

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const value: AuthContextType = { user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
