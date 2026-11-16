import { createBrowserRouter, Navigate } from 'react-router';

import ErrorPage from '@src/shared/pages/ErrorPage';
import AppLayout from '@src/layouts/AppLayout';
import AuthLayout from '@src/layouts/AuthLayout';

import { GuestRoute, ProtectedRoute } from './ProtectedRoute';
import { studentRoutes } from './student.routes';
import { lecturerRoutes } from './lecturer.routes';
import { adminRoutes } from './admin.routes';

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    ErrorBoundary: ErrorPage,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            lazy: async () => {
              const page = await import('@src/features/auth/pages/LoginPage');
              return { Component: page.default };
            },
          },
          {
            path: 'register',
            lazy: async () => {
              const page = await import('@src/features/auth/pages/RegisterPage');
              return { Component: page.default };
            },
          },
          {
            path: 'account-help',
            lazy: async () => {
              const page = await import('@src/features/auth/pages/AccountHelpPage');
              return { Component: page.default };
            },
          },
          {
            path: '',
            element: <Navigate to="/login" replace />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    ErrorBoundary: ErrorPage,
    children: [
      {
        element: <AppLayout />,
        children: [...studentRoutes, ...lecturerRoutes, ...adminRoutes],
      },
      {
        path: '403',
        lazy: async () => {
          const page = await import('@src/shared/pages/ForbiddenPage');
          return { Component: page.default };
        },
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
