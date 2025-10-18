import { motion } from "framer-motion";
import { MessageSquare, UserRound } from "lucide-react";

const ConnectionCard = ({ connection }) => {
  if (!connection) return null;

  const { firstName, lastName, photoURL, about, skills } = connection;

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

        <p className="text-slate-300 text-sm mt-1 italic line-clamp-2">
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
        <button className="btn btn-sm w-28 bg-indigo-600 hover:bg-indigo-700 border-none text-white flex items-center justify-center gap-2">
          <UserRound className="w-4 h-4" /> View
        </button>
        <button className="btn btn-sm w-28 bg-slate-700 hover:bg-slate-600 border-none text-white flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4" /> Message
        </button>
      </div>
    </motion.div>
  );
};

export default ConnectionCard;
