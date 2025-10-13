import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux-toolkit/slices/userSlice";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { BASE_URL } from "../config/config";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <nav className="navbar bg-base-200/80 backdrop-blur-md shadow-md border-b border-slate-700/30 px-4 sticky top-0 z-[100]">
      {/* Left Section */}
      <div className="flex-1">
        <Link
          to="/feed"
          className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors"
        >
          DevConnect <span className="text-indigo-400">🧑‍💻</span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user?.firstName && (
          <p className="hidden sm:block text-sm text-slate-300">
            Welcome,{" "}
            <span className="font-semibold text-white">{user.firstName}</span>
          </p>
        )}

        {/* Dropdown */}
        <div className="dropdown dropdown-end relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
          >
            <div className="w-10 rounded-full overflow-hidden border border-slate-600">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User avatar" />
              ) : (
                <FaUserCircle className="text-3xl text-slate-400" />
              )}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-xl mt-3 w-52 p-2 shadow-lg border border-slate-700/20 z-[200]"
          >
            <li>
              <Link to="/profile" className="flex justify-between">
                Profile{" "}
                <span className="badge badge-sm badge-primary">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
