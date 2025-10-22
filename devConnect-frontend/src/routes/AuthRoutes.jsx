// src/routes/AuthRoutes.jsx
import { lazy } from "react";
import { Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
const Login = lazy(() => import("../pages/Login"));

export const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
  </Route>
);
