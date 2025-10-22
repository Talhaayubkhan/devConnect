// src/routes/ProtectedRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../layouts/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

// Pages
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";

// Components
import Connections from "../components/Connections";
import Requests from "../components/Requests";

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
