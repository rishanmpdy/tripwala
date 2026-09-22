import { createContext, useContext, useEffect, useState } from "react";
import { configuredAdminEmail, signInWithEmail } from "./authApi";

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
    const credentials = await signInWithEmail(email, password);
    const normalizedEmail = credentials.email.toLowerCase();
    if (!configuredAdminEmail || normalizedEmail !== configuredAdminEmail) {
      throw new Error("This account does not have administrator access.");
    }
    setSession({ email: credentials.email, idToken: credentials.idToken });
  };

  const logout = () => setSession(null);
  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
