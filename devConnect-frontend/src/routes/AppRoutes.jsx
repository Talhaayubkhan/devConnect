import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthRoutes } from "./AuthRoutes";
import Error from "../pages/Error";
import Loader from "../components/Loader";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {ProtectedRoutes}
        {AuthRoutes}

        {/* Catch-all (Global) */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}
