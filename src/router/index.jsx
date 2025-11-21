// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "@/pages/About";
import Login from "@/pages/login/Login";
import App from "../App";
import MainLayout from "@/layout/MainLayout";
import Rent from "@/pages/rent/index";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Rent />,
      },
    ],
  },
]);
