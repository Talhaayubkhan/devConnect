// routes/AppRoutes.jsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthRoutes } from "./AuthRoutes";
import Loader from "../components/Loader";
import Error from "../pages/Error";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {ProtectedRoutes}
        {AuthRoutes}

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />

        {/* 🧭 404 Fallback */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}
