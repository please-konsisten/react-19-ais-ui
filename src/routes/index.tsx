import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';

import { useAuth } from '@src/contexts/AuthContext';

function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Memuat...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children ?? <Outlet />;
}

function GuestRoute({ children }: { children?: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Memuat...</p>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children ?? <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "login",
        lazy: async () => {
          const loginPage = await import("@src/pages/auth/LoginPage");
          return { Component: loginPage.default };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const registerPage = await import("@src/pages/auth/RegisterPage");
          return { Component: registerPage.default };
        },
      },
      {
        path: "",
        element: <Navigate to="/login" replace />,
      }
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        lazy: async () => {
          const dashboardPage = await import("@src/pages/app/DashboardPage");
          return { Component: dashboardPage.default };
        },
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
