import App from "@src/App";
import LoginPage from "@src/pages/auth/LoginPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <LoginPage />
  }
]);