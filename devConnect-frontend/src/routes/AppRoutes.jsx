// routes/AppRoutes.jsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthRoutes } from "./AuthRoutes";
import Loader from "../components/Loader";
import Error from "../pages/Error";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* 🔒 Protected Routes (for logged-in users) */}
        {ProtectedRoutes}

        {/* 🔐 Auth Routes (login/register) */}
        {AuthRoutes}

        {/* 🧭 404 Fallback */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}
