// src/router/AuthRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const token = useSelector((state) => state.counter.token);

  return token ? <Navigate to="/" replace /> : children;
}
