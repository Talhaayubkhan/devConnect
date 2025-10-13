import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";
import { addRequestData } from "../redux-toolkit/slices/requestSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const useFetchRequests = () => {
  const requests = useSelector((store) => store?.requests);
  //   console.log(requests);

  const dispatch = useDispatch();

  const showAllRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });

      if (res?.data?.success && res?.data?.data?.length > 0) {
        dispatch(addRequestData(res?.data?.data));
        toast.success(`Fetched ${res?.data?.data?.length} new request(s)`);
      } else {
        toast("No new Requests found.", { icon: "ℹ️" });
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests. Please try again.");
    }
  };

  useEffect(() => {
    showAllRequests();
  }, []);

  return { requests };
};
