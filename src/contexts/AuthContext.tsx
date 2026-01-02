import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, type User, type Tokens } from '../services/api';

interface AuthContextValue {
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, role?: string, companyName?: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
  getRedirectPath: (role: string) => string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const roleRedirectMap: Record<string, string> = {
  SUPERADMIN: '/dashboard/admin/overview',
  TENANT: '/dashboard/ta/overview',
  WM: '/dashboard/wm/overview',
  WO: '/dashboard/wm/overview',
  MERCHANT: '/dashboard/merchant/overview',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(api.getUser());
  const [tokens, setTokens] = useState<Tokens | null>(api.getTokens());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!tokens?.access_token) {
        setLoading(false);
        return;
      }
      try {
        const me = await api.me();
        setUser(me);
      } catch (err) {
        console.warn('Auth bootstrap failed, clearing tokens', err);
        await api.logout();
        setUser(null);
        setTokens(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [tokens]);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    setTokens(api.getTokens());
    setUser(res.user);
    return res.user;
  };

  const signup = async (email: string, password: string, role?: string, companyName?: string) => {
    const res = await api.signup(email, password, role, companyName);
    setTokens(api.getTokens());
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setTokens(null);
  };

  const refreshUser = async () => {
    if (!tokens?.access_token) return null;
    try {
      const me = await api.me();
      setUser(me);
      return me;
    } catch (err) {
      await logout();
      return null;
    }
  };

  const getRedirectPath = (role: string) => roleRedirectMap[role] || '/dashboard';

  const value = useMemo<AuthContextValue>(() => ({
    user,
    tokens,
    loading,
    isAuthenticated: Boolean(tokens?.access_token),
    login,
    signup,
    logout,
    refreshUser,
    getRedirectPath,
  }), [user, tokens, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
