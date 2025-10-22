import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addUser } from "./redux-toolkit/slices/userSlice";
import { useConnectionStatus } from "./hooks/useConnectionStatus";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const isOnline = useConnectionStatus();
  const prevStatus = useRef(isOnline);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) dispatch(addUser(JSON.parse(storedUser)));
  }, [dispatch]);

  useEffect(() => {
    if (prevStatus.current === isOnline) return;

    if (!prevStatus.current && isOnline)
      toast.success("✅ You're back online!", { autoClose: 1500 });
    else if (prevStatus.current && !isOnline)
      toast.error("⚠️ You are offline.", { autoClose: 2000 });

    prevStatus.current = isOnline;
  }, [isOnline]);

  return (
    <BrowserRouter>
      {!isOnline && (
        <div className="bg-red-600 text-white text-sm text-center py-2 fixed top-0 left-0 w-full z-50 shadow-md">
          ⚠️ You’re offline. Some features may not work.
        </div>
      )}

      <AppRoutes />

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
