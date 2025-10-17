import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUserData } from "../redux-toolkit/slices/requestSlice";

export const useReviewRequest = () => {
  const [loadingRequestId, setLoadingRequestId] = useState(null);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      setLoadingRequestId(requestId);

      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      // console.log("Request Response:", res.data);
      if (status === "accepted")
        toast.success("Request accepted Successfully!");
      if (status === "rejected") toast.error("Request rejected Successfully!");

      dispatch(removeUserData(requestId));
    } catch (error) {
      console.error("ERROR ", error.message);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingRequestId(null); // reset
    }
  };

  return { loadingRequestId, reviewRequest };
};
