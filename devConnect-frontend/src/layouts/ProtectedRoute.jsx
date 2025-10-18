import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((state) => state?.user);

  // ❌ If not logged in, redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // ✅ If logged in, show the page
  return <Outlet />;
};

export default ProtectedRoute;
