// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthRoutes } from "./AuthRoutes";
import Error from "../pages/Error";

export default function AppRoutes() {
  return (
    <Routes>
      {ProtectedRoutes}
      {AuthRoutes}

      {/* Catch-all (Global) */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
