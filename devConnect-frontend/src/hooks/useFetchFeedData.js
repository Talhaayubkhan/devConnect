import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../config/config";
import { addFeedData } from "../redux-toolkit/slices/feedSlice";
import { toast } from "react-toastify";
import React from "react";

export const useFetchFeedData = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();
  const getFeedData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeedData(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  React.useEffect(() => {
    getFeedData();
  }, []);
  return { feed };
};
