import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoURL, about, age, skills, gender } = user;

  return (
    <div className="flex justify-center items-center px-4">
      <div className="card w-92 bg-base-100/90 backdrop-blur-lg shadow-xl border border-slate-700/40 rounded-xl transition-transform duration-100 hover:scale-105 hover:shadow-md">
        {/* Profile Image */}
        <div className="w-full h-full p-4 m-2 overflow-hidden rounded-t-2xl">
          <img
            src={photoURL}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <hr />
        {/* User Info */}
        <div className="card-body text-center p-3">
          <h2 className="text-2xl font-semibold text-white">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <p className="text-slate-300 text-sm mt-1">
              {age && `${age} years`}
              {age && gender && " • "}
              {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {skills?.map((skill, index) => (
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
          <p className="text-slate-400 mt-3 text-sm italic line-clamp-3">
            {about || "No bio provided yet."}
          </p>

          {/* Actions */}
          <div className="card-actions justify-center mt-3">
            <button className="btn bg-red-500 hover:bg-red-600 border-none text-white">
              Ignore
            </button>
            <button className="btn bg-green-500 hover:bg-green-600 border-none text-white">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
