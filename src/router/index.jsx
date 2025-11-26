// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "@/pages/About";
import Login from "@/pages/login/Login";
import App from "../App";
import MainLayout from "@/layout/MainLayout";
import Rent from "@/pages/rent/index";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Rent />,
      },
      {
        path: "about",
        element: <About />,
      }
    ],
  },
]);
