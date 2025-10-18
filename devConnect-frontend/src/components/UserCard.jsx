// import { useSendConnectionRequest } from "../hooks/useSendConnectionRequest";

// const UserCard = ({ user }) => {
//   const { handleSendRequest, loadingIgnore, loadingInterested } =
//     useSendConnectionRequest();

//   if (!user) return null;

//   const { _id, firstName, lastName, photoURL, about, age, skills, gender } =
//     user;

//   return (
//     <div className="flex justify-center items-center px-4">
//       <div className="card w-82 bg-base-100/90 backdrop-blur-lg shadow-xl border border-slate-700/40 rounded-xl transition-transform duration-100 hover:scale-105 hover:shadow-md">
//         {/* Profile Image */}
//         <div className="w-full h-82 overflow-hidden rounded-t-2xl">
//           <img
//             src={photoURL}
//             alt={`${firstName} ${lastName}`}
//             className="w-full h-full object-cover object-center"
//           />
//         </div>

//         {/* User Info */}
//         <div className="card-body text-center p-2">
//           <h2 className="text-2xl font-semibold text-white">
//             {firstName} {lastName}
//           </h2>

//           {(age || gender) && (
//             <p className="text-slate-300 text-sm">
//               {age && `${age} years`}
//               {age && gender && " • "}
//               {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
//             </p>
//           )}

//           {/* Skills */}
//           {skills && skills.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-1">
//               {skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="text-xs bg-slate-700/60 text-slate-200 px-2 py-1 rounded-full"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* About */}
//           <p className="text-slate-400 mt-2 text-sm italic line-clamp-3">
//             {about || "No bio provided yet."}
//           </p>

//           {/* Actions */}
//           <div className="card-actions justify-center mt-2 items-center">
//             <button
//               className="btn bg-red-500 hover:bg-red-600 border-none text-white"
//               onClick={() => handleSendRequest("ignored", _id)}
//               disabled={loadingIgnore || loadingInterested}
//             >
//               {loadingIgnore ? (
//                 <span className="loading loading-spinner loading-sm"></span>
//               ) : (
//                 "Ignore"
//               )}
//             </button>

//             <button
//               className="btn bg-green-500 hover:bg-green-600 border-none text-white"
//               onClick={() => handleSendRequest("interested", _id)}
//               disabled={loadingIgnore || loadingInterested}
//             >
//               {loadingInterested ? (
//                 <span className="loading loading-spinner loading-sm"></span>
//               ) : (
//                 "Interested"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

// import { useSendConnectionRequest } from "../hooks/useSendConnectionRequest";

// const UserCard = ({ user }) => {
//   const { handleSendRequest, loadingIgnore, loadingInterested } =
//     useSendConnectionRequest();

//   if (!user) return null;

//   const { _id, firstName, lastName, photoURL, about, age, skills, gender } =
//     user;

//   return (
//     <div className="flex justify-center items-center w-full px-4 py-10">
//       <div className="relative w-full max-w-sm bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700/40 rounded-2xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl">
//         {/* Cover + Avatar */}
//         <div className="relative">
//           <img
//             src={photoURL}
//             alt={`${firstName} ${lastName}`}
//             className="w-full h-72 object-cover opacity-80"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

//           <div className="absolute bottom-3 left-4">
//             <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
//               {firstName} {lastName}
//             </h2>
//             {(age || gender) && (
//               <p className="text-slate-300 text-sm">
//                 {age && `${age} yrs`}
//                 {age && gender && " • "}
//                 {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Body */}
//         <div className="p-4 text-center">
//           {skills && skills.length > 0 && (
//             <div className="flex flex-wrap justify-center gap-2 mb-3">
//               {skills.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="px-2 py-1 text-xs rounded-full bg-slate-700/60 text-slate-200"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           )}

//           <p className="text-slate-400 text-sm italic line-clamp-3 mb-4">
//             {about || "No bio provided yet."}
//           </p>

//           {/* Actions */}
//           <div className="flex justify-center gap-3">
//             <button
//               onClick={() => handleSendRequest("ignored", _id)}
//               disabled={loadingIgnore || loadingInterested}
//               className="btn bg-gradient-to-r from-red-500 to-red-600 border-none text-white hover:from-red-600 hover:to-red-700"
//             >
//               {loadingIgnore ? (
//                 <span className="loading loading-spinner loading-sm"></span>
//               ) : (
//                 "Ignore"
//               )}
//             </button>

//             <button
//               onClick={() => handleSendRequest("interested", _id)}
//               disabled={loadingIgnore || loadingInterested}
//               className="btn bg-gradient-to-r from-emerald-500 to-green-600 border-none text-white hover:from-green-600 hover:to-green-700"
//             >
//               {loadingInterested ? (
//                 <span className="loading loading-spinner loading-sm"></span>
//               ) : (
//                 "Interested"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import { useSendConnectionRequest } from "../hooks/useSendConnectionRequest";

const UserCard = ({ user, variant = "feed", editable = false }) => {
  const { handleSendRequest, loadingIgnore, loadingInterested } =
    useSendConnectionRequest();

  if (!user) return null;

  const { _id, firstName, lastName, photoURL, about, age, skills, gender } =
    user;

  return (
    <div className="flex justify-center items-center w-full px-4 py-6">
      <div
        className={`relative w-full max-w-sm rounded-2xl border border-slate-700/40 shadow-lg overflow-hidden transition-transform duration-200 
        ${
          variant === "feed"
            ? "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 hover:scale-[1.02] hover:shadow-2xl"
            : "bg-base-100/90 backdrop-blur-md"
        }`}
      >
        {/* Profile Header */}
        <div className="relative">
          <img
            src={
              photoURL ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={`${firstName || "User"} ${lastName || ""}`}
            className="w-full h-75 object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

          <div className="absolute bottom-3 left-4">
            <h2 className="text-2xl font-semibold text-white drop-shadow-md">
              {firstName || "Unnamed"} {lastName || ""}
            </h2>
            {(age || gender) && (
              <p className="text-slate-300 text-sm">
                {age && `${age} yrs`}
                {age && gender && " • "}
                {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 text-center">
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-slate-700/60 text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <p className="text-slate-400 text-sm italic line-clamp-3 mb-4">
            {about || "No bio provided yet."}
          </p>

          {/* Show Action Buttons only for feed variant */}
          {variant === "feed" && !editable && (
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleSendRequest("ignored", _id)}
                disabled={loadingIgnore || loadingInterested}
                className="btn bg-gradient-to-r from-red-500 to-red-600 border-none text-white hover:from-red-600 hover:to-red-700"
              >
                {loadingIgnore ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Ignore"
                )}
              </button>

              <button
                onClick={() => handleSendRequest("interested", _id)}
                disabled={loadingIgnore || loadingInterested}
                className="btn bg-gradient-to-r from-emerald-500 to-green-600 border-none text-white hover:from-green-600 hover:to-green-700"
              >
                {loadingInterested ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Interested"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
