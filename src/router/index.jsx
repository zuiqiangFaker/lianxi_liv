// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from "../pages/Home";
import About from "@/pages/About";
import Share from "@/pages/share/index";
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
        element: <Navigate to="ranting" replace />,
      },
      {
        path: "ranting",
        element: <Rent />,
      },
      {
        path: "sharing",
        element: <Share />,
      },
    ],
  },
]);
