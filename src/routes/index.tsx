import { createBrowserRouter, Navigate, redirect, Outlet } from "react-router"; // Sesuai rekomendasi browser

const protectedLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");
  return null;
};

const publicOnlyLoader = async () => {
  const token = localStorage.getItem("token");
  if (token) return redirect("/dashboard");
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    // loader: protectedLoader,
    element: <Outlet />,
    children: [
      {
        index: true, 
        element: <Navigate to="/dashboard" replace />,
      },
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
    element: <Outlet />,
    loader: publicOnlyLoader,
    children: [
      {
        path: "login",
        lazy: async () => {
          const loginPage = await import("@src/pages/auth/LoginPage");
          return { Component: loginPage.default };
        },
      },
    ],
  },
]);
