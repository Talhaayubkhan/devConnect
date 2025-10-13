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

      if (res?.data?.success) {
        dispatch(addConnectionData(res?.data?.data));
        if (res?.data?.data?.length > 0) {
          toast.success(
            `Fetched ${res?.data?.data?.length} connection(s) successfully`
          );
        } else {
          toast("You have no connections yet.", { icon: "🔗" });
        }
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
      toast.error("Failed to load connections. Please try again.");
    }
  };

  useEffect(() => {
    showConnections();
  }, []);

  return { connectionData };
};
