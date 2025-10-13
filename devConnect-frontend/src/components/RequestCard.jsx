const RequestCard = ({ request, onReview, loading }) => {
  if (!request) return null;

  const { _id, firstName, lastName, photoURL, about, age, gender, skills } =
    request.fromUserId || {};

  return (
    <div className="flex justify-center items-center w-full px-4">
      <div className="card w-full max-w-2xl bg-base-100/90 backdrop-blur-md shadow-lg border border-slate-700/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-center sm:items-start gap-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
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

          {/* Age & Gender */}
          {(age || gender) && (
            <p className="text-slate-400 text-sm mt-0.5">
              {age && `${age} years`}
              {age && gender && " • "}
              {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}

          {/* About */}
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

        {/* Actions (Centered Vertically) */}
        <div className="flex flex-col gap-3 mt-1.5 items-center justify-center h-full cursor-pointer">
          <button
            className="btn btn-sm bg-green-600 hover:bg-green-700 border-none text-white w-24"
            onClick={() => onReview("accepted", request._id)}
          >
            {loading ? "Accepting.." : "Accept"}
          </button>
          <button
            className="btn btn-sm bg-red-600 hover:bg-red-700 border-none text-white w-24"
            onClick={() => onReview("rejected", request._id)}
          >
            {loading ? "Rejecting" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
