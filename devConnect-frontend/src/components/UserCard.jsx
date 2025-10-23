import { motion } from "framer-motion";
import { useSendConnectionRequest } from "../hooks/useSendConnectionRequest";
import { User, Code, Heart, X } from "lucide-react";

const UserCard = ({ user, variant = "feed", editable = false }) => {
  const { handleSendRequest, loadingIgnore, loadingInterested } =
    useSendConnectionRequest();

  if (!user) return null;

  const { _id, firstName, lastName, photoURL, about, age, skills, gender } =
    user;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1 }}
      className="flex justify-center items-center w-full px-2 py-3"
    >
      <div
        className={`relative w-full max-w-sm rounded-2xl border border-slate-700/40 shadow-lg overflow-hidden 
        backdrop-blur-lg transition-all duration-300
        ${
          variant === "feed"
            ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black hover:shadow-2xl"
            : "bg-base-100/90"
        }`}
      >
        {/* 🖼 Profile Image Section */}
        <div className="relative">
          <img
            src={
              photoURL ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={`${firstName || "User"} ${lastName || ""}`}
            className="w-full h-76 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/35 to-transparent"></div>

          {/* 🧠 User Info Overlay */}
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              {firstName || "Unnamed"} {lastName || ""}
            </h2>
            {(age || gender) && (
              <p className="text-slate-400 text-sm mt-1">
                {age && `${age} yrs`}
                {age && gender && " • "}
                {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* 💬 Card Body */}
        <div className="p-5 text-center">
          {/* 🧩 Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  <Code className="inline-block w-3 h-3 mr-1" />
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* 🧾 About */}
          <p className="text-slate-400 text-sm italic line-clamp-3 mb-5">
            {about || "This developer hasn’t written a bio yet."}
          </p>

          {/* ❤️ Tinder-like Buttons */}
          {variant === "feed" && !editable && (
            <div className="flex justify-center gap-6">
              {/* ❌ Ignore */}
              <motion.button
                whileTap={{ scale: 1 }}
                onClick={() => handleSendRequest("ignored", _id)}
                disabled={loadingIgnore || loadingInterested}
                className="btn bg-gradient-to-r from-rose-600 to-rose-700 border-none text-white shadow-md hover:shadow-rose-500/40 hover:scale-105"
              >
                {loadingIgnore ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <X className="w-5 h-5" />
                )}
              </motion.button>

              {/* 💚 Interested */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSendRequest("interested", _id)}
                disabled={loadingIgnore || loadingInterested}
                className="btn bg-gradient-to-r from-emerald-500 to-green-600 border-none text-white shadow-md hover:shadow-emerald-400/40 hover:scale-105"
              >
                {loadingInterested ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Heart className="w-5 h-5 fill-current" />
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
