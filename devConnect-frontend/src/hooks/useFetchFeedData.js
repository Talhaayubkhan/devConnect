import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../redux-toolkit/slices/feedSlice";
import { toast } from "react-toastify";
import React from "react";
import api from "../api/axios";

export const useFetchFeedData = () => {
  const feed = useSelector((store) => store?.feed);

  const [isLoadingConnections, setIsLoadingConnections] = React.useState(false);
  const dispatch = useDispatch();
  const getFeedData = async () => {
    try {
      setIsLoadingConnections(true);
      const res = await api.get(`/feed`);

      dispatch(addFeedData(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    } finally {
      setIsLoadingConnections(false);
    }
  };

  React.useEffect(() => {
    getFeedData();
  }, []);
  return { feed, isLoadingConnections };
};
