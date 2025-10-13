import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";
import { addConnectionData } from "../redux-toolkit/slices/connectionSlice";
import { useEffect } from "react";

export const useFetchConnections = () => {
  const connectionData = useSelector((state) => state?.connections);
  const dispatch = useDispatch();

  const showConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnectionData(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
      toast.error("Failed to load connections. Please try again later.");
    }
  };

  useEffect(() => {
    showConnections();
  }, []);

  return { connectionData };
};
