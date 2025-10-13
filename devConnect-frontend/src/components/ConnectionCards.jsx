const ConnectionCards = ({ connections }) => {
  if (!connections) return null;

  const { firstName, lastName, photoURL, about, skills } = connections;

  return (
    <div className="flex justify-center items-center w-full px-10">
      <div className="card w-full max-w-2xl bg-base-100/90 backdrop-blur-md shadow-lg border border-slate-700/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={photoURL || "/default-user.png"}
            alt={`${firstName} ${lastName}`}
            className="w-24 h-24 rounded-full object-cover border border-slate-700/40 shadow-sm"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-slate-300 text-sm mt-1 italic line-clamp-2">
            {about || "No bio available."}
          </p>

          {/* Skills */}
          {skills && skills.length > 0 ? (
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-slate-700/60 text-slate-200 px-2 py-1 rounded-full border border-slate-600/30"
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
        {/* 
        <div className="flex flex-col items-center justify-center sm:flex-row gap-2 sm:ml-3 mt-4 sm:mt-0">
          <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 border-none text-white">
            View
          </button>
          <button className="btn btn-sm bg-slate-700 hover:bg-slate-600 border-none text-white">
            Message
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ConnectionCards;
