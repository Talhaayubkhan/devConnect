import { lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../layouts/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

// Pages
const Feed = lazy(() => import("../pages/Feed"));
const Profile = lazy(() => import("../pages/Profile"));

// Components
const Connections = lazy(() => import("../components/Connections"));
const Requests = lazy(() => import("../components/Requests"));

export const ProtectedRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<MainLayout />}>
      <Route path="feed" element={<Feed />} />
      <Route path="profile" element={<Profile />} />
      <Route path="connections" element={<Connections />} />
      <Route path="requests" element={<Requests />} />
    </Route>
  </Route>
);
