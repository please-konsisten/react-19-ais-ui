import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';

import api, {
  clearAccessToken,
  refreshAccessToken,
  setAccessToken,
  setAuthFailureHandler,
} from '../api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<unknown>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hanya untuk MENAMPILKAN data user di UI (id, email, role dari payload access token).
// Ini bukan verifikasi: keputusan keamanan tetap dilakukan backend.
const decodeToken = (token: string): User | null => {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const applyToken = useCallback((token: string) => {
    setAccessToken(token);
    const payload = decodeToken(token);
    setUser(payload ? { id: payload.id, email: payload.email, role: payload.role } : null);
  }, []);

  useEffect(() => {
    setAuthFailureHandler(() => setUser(null));

    refreshAccessToken()
      .then(applyToken)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [applyToken]);

  const login = useCallback(
    async ({ identifier, password }: LoginCredentials) => {
      const res = await api.post('/auth/login', { identifier, password });
      applyToken(res.data.data.accessToken);
    },
    [applyToken]
  );

  const register = useCallback(async ({ username, email, password }: RegisterPayload) => {
    const res = await api.post('/auth/register', { username, email, password });
    return res.data.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider');
  }
  return context;
}
