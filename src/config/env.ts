function requireEnv(key: 'VITE_ADMIN_EMAIL' | 'VITE_ADMIN_WHATSAPP'): string {
  const value = import.meta.env[key];

  if (!value || String(value).trim() === '') {
    throw new Error(`Environment variable ${key} belum di-set di file .env`);
  }

  return String(value).trim();
}

export const ADMIN_EMAIL = requireEnv('VITE_ADMIN_EMAIL');
export const ADMIN_WHATSAPP = requireEnv('VITE_ADMIN_WHATSAPP');