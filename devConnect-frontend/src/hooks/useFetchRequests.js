import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";
import { addRequestData } from "../redux-toolkit/slices/requestSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const useFetchRequests = () => {
  const requests = useSelector((store) => store?.requests);
  // console.log(requests);

  const dispatch = useDispatch();

  const showAllRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      // console.log(res.data.data);

      dispatch(addRequestData(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests. Please try again later.");
    }
  };

  useEffect(() => {
    showAllRequests();
  }, []);

  return { requests };
};
