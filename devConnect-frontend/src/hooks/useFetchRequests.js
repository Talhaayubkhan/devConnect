import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";
import { addRequestData } from "../redux-toolkit/slices/requestSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const useFetchRequests = () => {
  const requests = useSelector((store) => store?.requests);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const showAllRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequestData(res.data.data || []));
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showAllRequests();
  }, []);

  return { requests, loading };
};
