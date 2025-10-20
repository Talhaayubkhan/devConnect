import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../redux-toolkit/slices/userSlice";
import api from "../api/axios";

export const useFetchProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const presentUser = useSelector((store) => store?.user?.data);

  const fetchUserProfile = async () => {
    try {
      // If user already in Redux, skip fetch
      if (presentUser) return;

      const res = await api.get(`/profile`);

      // ✅ If success → save in Redux
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        toast.info("Please login again!");
        return navigate("/login");
      } else if (status === 403) {
        toast.error("Access denied. Unauthorized user.");
      } else if (status === 404) {
        toast.warn("User not found!");
      } else {
        toast.error("Something went wrong. Try again later.");
      }

      console.error("Profile Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
};
