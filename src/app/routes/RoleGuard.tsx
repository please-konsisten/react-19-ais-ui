import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@src/app/providers/AuthProvider';
import type { Role } from '@src/types/auth';

// Hanya untuk UX (menyembunyikan halaman). Keputusan keamanan tetap di backend.
export function RoleGuard({ allow }: { allow: Role[] }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Memuat...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to="/403" replace />;
  return <Outlet />;
}
