import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux-toolkit/slices/userSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Users, Bell, UserStar } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post(`/logout`, {});
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <nav
      className={`
        navbar sticky top-0 z-[100] px-4 border-b shadow-md backdrop-blur-md transition-all duration-300
        bg-white/70 text-slate-800 border-slate-300/40
        dark:bg-slate-900/80 dark:text-slate-100 dark:border-slate-700/40
      `}
    >
      {/* Left Section */}
      <div className="flex-1">
        <Link
          to="/feed"
          className="text-2xl font-bold hover:text-indigo-500 transition-colors"
        >
          <span className="text-indigo-500">Dev</span>
          Connect <span className="text-indigo-400">🧑‍💻</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user?.firstName && (
          <p className="hidden sm:block text-sm text-slate-600 dark:text-slate-300">
            Welcome,{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {user.firstName}
            </span>
          </p>
        )}

        {/* Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-200"
          >
            <div className="w-10 rounded-full overflow-hidden border border-slate-400 dark:border-slate-600">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User
                  className="text-slate-700 dark:text-slate-300 mx-auto mt-2"
                  size={26}
                />
              )}
            </div>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`
                  absolute right-0 mt-3 w-56 rounded-xl p-2 z-[200] shadow-xl border transition-all
                  bg-white text-slate-800 border-slate-200
                  dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
                `}
              >
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-2"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-2"
                  >
                    <Users size={18} />
                    <span>Connections</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-2"
                  >
                    <Bell size={18} />
                    <span>Requests</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/premium"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-2"
                  >
                    <UserStar size={18} />
                    <span>Premium</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg px-3 py-2 font-semibold"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
