import { motion } from "framer-motion";

const RequestCard = ({ request, onReview, loading }) => {
  if (!request) return null;

  const { _id, firstName, lastName, photoURL, about, age, gender, skills } =
    request.fromUserId || {};

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-slate-800/80 backdrop-blur-lg border border-slate-700/40 
                 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                 p-6 w-full flex flex-col sm:flex-row sm:items-center gap-6"
    >
      {/* Profile Image */}
      <div className="flex justify-center sm:justify-start">
        <img
          src={photoURL || "/default-user.png"}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover border border-slate-600/40 shadow-sm"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl font-semibold text-white mb-1">
          {firstName} {lastName}
        </h2>

        {(age || gender) && (
          <p className="text-slate-400 text-sm">
            {age && `${age} yrs`} {age && gender && "•"}{" "}
            {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
          </p>
        )}

        <p className="text-slate-300 text-sm mt-2 italic line-clamp-2">
          {about || "No bio available."}
        </p>

        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-slate-700/60 text-slate-200 px-2 py-1 
                           rounded-full border border-slate-600/30"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm mt-2 italic">
            No skills added yet.
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row sm:flex-col gap-3 justify-center items-center">
        <button
          disabled={loading}
          onClick={() => onReview("accepted", request._id)}
          className={`btn btn-sm w-28 text-white border-none ${
            loading
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            "Accept"
          )}
        </button>

        <button
          disabled={loading}
          onClick={() => onReview("rejected", request._id)}
          className={`btn btn-sm w-28 text-white border-none ${
            loading
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            "Reject"
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default RequestCard;
