import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { removeUserFromFeed } from "../redux-toolkit/slices/feedSlice";

export const useSendConnectionRequest = () => {
  const dispatch = useDispatch();

  const [loadingIgnore, setLoadingIgnore] = React.useState(false);
  const [loadingInterested, setLoadingInterested] = React.useState(false);

  const handleSendRequest = async (status, toUserId) => {
    try {
      if (status === "ignored") setLoadingIgnore(true);
      if (status === "interested") setLoadingInterested(true);

      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );

      const serverStatus = res?.data?.data?.status;
      const message = res?.data?.data?.message;

      if (serverStatus === "interested") {
        toast.success(message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else if (serverStatus === "ignored") {
        toast.info(message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }

      dispatch(removeUserFromFeed(toUserId));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      // ✅ Reset correct button
      if (status === "ignored") setLoadingIgnore(false);
      if (status === "interested") setLoadingInterested(false);
    }
  };

  return {
    handleSendRequest,
    loadingIgnore,
    loadingInterested,
  };
};
