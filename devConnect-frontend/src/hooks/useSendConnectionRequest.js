import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeUserFromFeed } from "../redux-toolkit/slices/feedSlice";
import api from "../api/axios";

export const useSendConnectionRequest = () => {
  const dispatch = useDispatch();

  const [loadingIgnore, setLoadingIgnore] = React.useState(false);
  const [loadingInterested, setLoadingInterested] = React.useState(false);

  const handleSendRequest = async (status, toUserId) => {
    try {
      if (status === "ignored") setLoadingIgnore(true);
      if (status === "interested") setLoadingInterested(true);

      const res = await api.post(`/request/send/${status}/${toUserId}`, {});

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
