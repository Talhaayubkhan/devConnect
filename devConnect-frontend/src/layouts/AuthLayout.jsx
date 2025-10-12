import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const user = useSelector((state) => state?.user);

  // ✅ Redirect if user already logged in
  if (user) return <Navigate to="/feed" replace />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-800 via-slate-900 to-cyan-800 relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Glassmorphism Layer */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Auth Page Content */}
      <div className="relative z-10 flex justify-center items-center w-full px-3">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
