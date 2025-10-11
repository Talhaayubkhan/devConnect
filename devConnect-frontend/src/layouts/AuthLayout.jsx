import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isUserAllowed = useSelector((store) => store.user);
  console.log(isUserAllowed);

  return (
    <div className="min-h-screen flex justify-center items-center bg-cyan-400">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
