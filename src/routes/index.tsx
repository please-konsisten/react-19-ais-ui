import { Navigate } from "react-router"
import { createBrowserRouter, redirect } from "react-router";
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
    element: <Navigate to="/login" replace />, 
  },
  {
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
  // {
  //   loader: protectedLoader,
  //   children: [
  //     {
  //       path: "dashboard",
  //       lazy: async () => {
  //         const { DashboardHome } = await import("./pages/dashboard/DashboardHome");
  //         return { Component: DashboardHome };
  //       },
  //     },
  //   ],
  // },
]);

