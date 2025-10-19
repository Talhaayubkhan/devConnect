import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// Components (sub-pages)
import Connections from "./components/Connections";
import Requests from "./components/Requests";

// Toastify
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { addUser } from "./redux-toolkit/slices/userSlice";

// Custom Hook
import { useConnectionStatus } from "./hooks/useConnectionStatus";

function App() {
  const dispatch = useDispatch();
  const isOnline = useConnectionStatus();
  const isFirstRun = useRef(true);

  // user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(addUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  //  Connection status handling
  useEffect(() => {
    // Prevent showing toast on the first render
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (isOnline) {
      toast.success("✅ You're back online!");
    } else {
      toast.error("⚠️ You are offline. Check your internet connection.");
    }
  }, [isOnline]);

  return (
    <BrowserRouter>
      {/* 🔔 Top Offline Banner */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-sm text-center py-2 fixed top-0 left-0 w-full z-50 shadow-md">
          You’re offline. Some features may not work.
        </div>
      )}

      <Routes>
        {/* 🔒 Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>

        {/* 🔐 Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {/* 🍞 Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
