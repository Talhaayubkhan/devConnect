import axios from "axios";
import React from "react";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";
import { removeUserFromFeed } from "../redux-toolkit/slices/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const [loadingIgnore, setLoadingIgnore] = React.useState(false);
  const [loadingInterested, setLoadingInterested] = React.useState(false);

  if (!user) return null;

  const { _id, firstName, lastName, photoURL, about, age, skills, gender } =
    user;

  const handleSendRequest = async (status, toUserId) => {
    try {
      if (status === "ignored") setLoadingIgnore(true);
      if (status === "interested") setLoadingInterested(true);

      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );

      // ✅ Frontend message from API
      if (res?.data?.message) {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }

      // ✅ Remove from feed after action
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

  return (
    <div className="flex justify-center items-center px-4">
      <div className="card w-82 bg-base-100/90 backdrop-blur-lg shadow-xl border border-slate-700/40 rounded-xl transition-transform duration-100 hover:scale-105 hover:shadow-md">
        {/* Profile Image */}
        <div className="w-full h-82 overflow-hidden rounded-t-2xl">
          <img
            src={photoURL}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* User Info */}
        <div className="card-body text-center p-2">
          <h2 className="text-2xl font-semibold text-white">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <p className="text-slate-300 text-sm">
              {age && `${age} years`}
              {age && gender && " • "}
              {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-slate-700/60 text-slate-200 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* About */}
          <p className="text-slate-400 mt-2 text-sm italic line-clamp-3">
            {about || "No bio provided yet."}
          </p>

          {/* Actions */}
          <div className="card-actions justify-center mt-2 items-center">
            <button
              className="btn bg-red-500 hover:bg-red-600 border-none text-white"
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={loadingIgnore || loadingInterested}
            >
              {loadingIgnore ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Ignore"
              )}
            </button>

            <button
              className="btn bg-green-500 hover:bg-green-600 border-none text-white"
              onClick={() => handleSendRequest("interested", _id)}
              disabled={loadingIgnore || loadingInterested}
            >
              {loadingInterested ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Interested"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
