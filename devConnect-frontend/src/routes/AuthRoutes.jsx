// src/routes/AuthRoutes.jsx
import { Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";

export const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
  </Route>
);
