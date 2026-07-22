"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function parseJwt(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      const parsed = parseJwt(stored);
      if (parsed?.exp) {
        const expiresAt = parsed.exp * 1000;
        const now = Date.now();
        if (expiresAt <= now) {
          localStorage.removeItem("token");
        } else {
          setToken(stored);
          const timeout = expiresAt - now;
          const timer = setTimeout(() => {
            localStorage.removeItem("token");
            setToken(null);
            router.push("/login");
          }, timeout);
          return () => clearTimeout(timer);
        }
      } else {
        setToken(stored);
      }
    }
    setLoading(false);
  }, [router, logout]);

  function login(newToken: string) {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    const parsed = parseJwt(newToken);
    if (parsed?.exp) {
      const expiresAt = parsed.exp * 1000;
      const timeout = expiresAt - Date.now();
      if (timeout > 0) {
        setTimeout(() => {
          localStorage.removeItem("token");
          setToken(null);
          router.push("/login");
        }, timeout);
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
