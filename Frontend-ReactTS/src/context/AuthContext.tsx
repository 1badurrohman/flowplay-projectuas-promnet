import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("flowplay_token")));

  useEffect(() => {
    const syncSession = () => setIsAuthenticated(Boolean(localStorage.getItem("flowplay_token")));
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
}
