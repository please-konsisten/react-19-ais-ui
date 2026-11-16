import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@src/app/providers/AuthProvider';

export function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Memuat...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children ?? <Outlet />;
}

export function GuestRoute({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Memuat...</p>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children ?? <Outlet />;
}
