import { createContext, use, useCallback, useEffect, useMemo, useState, type Context } from 'react';

import api, {
  clearAccessToken,
  refreshAccessToken,
  setAccessToken,
  setAuthFailureHandler,
} from '../api';

const AuthContext: Context<any|null> = createContext(null);

// Hanya untuk MENAMPILKAN data user di UI (id, email, role dari payload access token).
// Ini bukan verifikasi: keputusan keamanan tetap dilakukan backend.
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyToken = useCallback((token) => {
    setAccessToken(token);
    const payload = decodeToken(token);
    setUser(payload ? { id: payload.id, email: payload.email, role: payload.role } : null);
  }, []);

  // Saat aplikasi pertama dimuat, access token (di memori) kosong.
  // Minta yang baru lewat refresh token di cookie. Kalau gagal, user belum login.
  useEffect(() => {
    setAuthFailureHandler(() => setUser(null));

    refreshAccessToken()
      .then(applyToken)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [applyToken]);

  const login = useCallback(
    async ({ identifier, password }) => {
      const res = await api.post('/auth/login', { identifier, password });
      applyToken(res.data.data.accessToken);
    },
    [applyToken]
  );

  const register = useCallback(async ({ username, email, password }) => {
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

  // React 19: Context langsung dipakai sebagai provider, tanpa .Provider
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider');
  }
  return context;
}
