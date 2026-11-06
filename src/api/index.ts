import axios from 'axios';

// Base URL API (tanpa /auth). Cookie refresh di backend ber-path /api/auth,
// jadi endpoint refresh/logout harus berada di bawah path itu.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

// ---------------------------------------------------------------------------
// Access token: hanya di memori (bukan localStorage)
// ---------------------------------------------------------------------------
let accessToken: string|null = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => {
  accessToken = token;
};
export const clearAccessToken = () => {
  accessToken = null;
};

// Dipanggil saat refresh gagal (sesi habis), supaya UI bisa kembali ke login
let onAuthFailure = null;
export const setAuthFailureHandler = (handler) => {
  onAuthFailure = handler;
};

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

// withCredentials WAJIB agar cookie refreshToken dikirim dan disimpan browser
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Client polos tanpa interceptor, khusus untuk /auth/refresh (mencegah loop)
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ---------------------------------------------------------------------------
// Refresh: hanya SATU request refresh yang berjalan pada satu waktu.
// Request lain (termasuk dua panggilan dari StrictMode di development)
// menunggu promise yang sama. Ini penting karena refresh token di backend
// memakai rotation: memakai token yang sama dua kali dianggap pencurian
// dan mencabut semua sesi.
// ---------------------------------------------------------------------------
let refreshPromise = null;

export const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/auth/refresh-token')
      .then((res) => {
        const token = res.data.data.accessToken;
        setAccessToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// ---------------------------------------------------------------------------
// Interceptors
// ---------------------------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoint auth tidak boleh memicu refresh otomatis (login salah = 401 biasa)
const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh-token', '/auth/logout'];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isAuthEndpoint = AUTH_PATHS.some((path) => original?.url?.includes(path));

    if (error.response?.status !== 401 || !original || original._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      const newToken = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original); // ulangi request asli dengan token baru
    } catch (refreshError) {
      clearAccessToken();
      onAuthFailure?.();
      return Promise.reject(refreshError);
    }
  }
);

// ---------------------------------------------------------------------------
// Helper pesan error
// Sesuaikan dengan format respons error dari error handler backend kamu.
// ---------------------------------------------------------------------------
export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  const message = data?.message ?? data?.errors ?? data?.error;

  if (typeof message === 'string') return message;
  if (Array.isArray(message)) {
    return message.map((m) => m?.message ?? String(m)).join(', ');
  }

  return error?.response
    ? 'Terjadi kesalahan pada server'
    : 'Tidak dapat terhubung ke server';
};

export default api;
