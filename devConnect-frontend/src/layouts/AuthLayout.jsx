import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isUser = useSelector((state) => state?.user);

  if (isUser) return <Navigate to="/feed" />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-cyan-400">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
