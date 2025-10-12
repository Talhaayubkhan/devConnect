import axios from "axios";
import React from "react";
import { BASE_URL } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFeedData } from "../redux-toolkit/slices/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();
  const getFeedData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeedData(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  React.useEffect(() => {
    getFeedData();
  }, []);

  return (
    feed && (
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col justify-center items-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
