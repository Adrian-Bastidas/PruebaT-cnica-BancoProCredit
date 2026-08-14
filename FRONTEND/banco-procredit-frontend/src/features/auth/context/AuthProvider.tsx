import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { authService } from "../services/auth.service";
import type { LoginRequest, User } from "../types/auth.types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  login: (credentials: LoginRequest, rememberUser: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(
    async (credentials: LoginRequest, rememberUser: boolean) => {
      setLoading(true);
      setError("");
      try {
        const result = await authService.login(credentials);

        if (rememberUser)
          localStorage.setItem("procredit_remember_user", "true");
        else localStorage.removeItem("procredit_remember_user");

        setUser(result.user);
        return true;
      } catch (err) {
        console.log(err);

        const errorMessage =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (err as any).response?.data?.message ||
          (err instanceof Error
            ? err.message
            : "No fue posible iniciar sesión.");
        setError(errorMessage);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && authService.isAuthenticated()),
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  return context;
}
