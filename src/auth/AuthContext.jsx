import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmail } from "./authApi";

const AuthContext = createContext(null);
const sessionKey = "tripwala-admin-session";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(sessionKey)); } catch { return null; }
  });

  useEffect(() => {
    if (session) sessionStorage.setItem(sessionKey, JSON.stringify(session));
    else sessionStorage.removeItem(sessionKey);
  }, [session]);

  const login = async (email, password) => {
    const user = await signInWithEmail(email, password);
    setSession({
      id: user.id || "admin-user",
      name: user.name || user.email.split("@")[0],
      email: user.email,
      role: user.role || "admin",
      idToken: user.idToken || "demo-session",
    });
  };

  const logout = () => setSession(null);
  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
