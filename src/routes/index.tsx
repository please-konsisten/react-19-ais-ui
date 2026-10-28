import { Navigate } from "react-router"
import { createBrowserRouter, redirect } from "react-router";
const protectedLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");
  return null;
};

const publicOnlyLoader = async () => {
  const token = localStorage.getItem("token");
  if (token) return redirect("/");
  return null;
};

export const router = createBrowserRouter([
  {
    loader: protectedLoader,
    path: "/",
    lazy: async () => {
          const app = await import("src/App");
          return { Component: app.default };
        },
  },
  {
    loader: publicOnlyLoader,
    children: [
      {
        path: "login",
        lazy: async () => {
          const loginPage = await import("src/pages/auth/LoginPage");
          return { Component: loginPage.default };
        },
      },
    ],
  },
]);

