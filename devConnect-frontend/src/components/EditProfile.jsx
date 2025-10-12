import { FaUserEdit } from "react-icons/fa";
import UserCard from "./UserCard";
import { SUPPORTED_GENDER } from "../constants/options";
import { useUserSaveProfile } from "../hooks/useUserSaveProfile";

const EditProfile = ({ user }) => {
  const {
    firstName,
    lastName,
    photoURL,
    age,
    gender,
    about,
    skills,
    setFirstName,
    setLastName,
    setPhotoURL,
    setAge,
    setGender,
    setAbout,
    setSkills,
    saveProfileData,
    isOnSaveLoading,
  } = useUserSaveProfile(user);

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10 px-6">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* ✏️ Left: Edit Form */}
        <div className="flex-1 flex justify-center">
          <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-700/20">
            {/* Header */}
            <div className="flex items-center justify-center mb-4">
              <FaUserEdit className="text-2xl text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-3">
              <img
                src={photoURL}
                alt="User Avatar"
                className="w-24 h-24 object-cover object-center rounded-full border-4 border-indigo-400 shadow-md"
              />
            </div>

            {/* Fields */}
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text text-slate-400">
                      First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="input input-bordered w-full bg-base-200 text-white"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-slate-400">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="input input-bordered w-full bg-base-200 text-white"
                  />
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text text-slate-400">Age</span>
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    className="input input-bordered w-full bg-base-200 text-white"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-slate-400">Gender</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full bg-base-200 text-white"
                  >
                    {SUPPORTED_GENDER.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="label">
                  <span className="label-text text-slate-400">Photo URL</span>
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter image URL"
                  className="input input-bordered w-full bg-base-200 text-white"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="label">
                  <span className="label-text text-slate-400">Skills</span>
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) =>
                    setSkills(e.target.value.split(",").map((s) => s.trim()))
                  }
                  placeholder="e.g. React, Node, MongoDB"
                  className="input input-bordered w-full bg-base-200 text-white"
                />
              </div>

              {/* About */}
              <div>
                <label className="label">
                  <span className="label-text text-slate-400">About</span>
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write something about yourself..."
                  className="textarea textarea-bordered w-full bg-base-200 text-white"
                  rows="3"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={saveProfileData}
                  disabled={isOnSaveLoading}
                  className={`btn bg-indigo-500 hover:bg-indigo-600 text-white px-6 ${
                    isOnSaveLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isOnSaveLoading ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 👤 Right: Live User Preview */}
        <div className="flex-1 flex justify-center">
          <UserCard
            user={{
              firstName,
              lastName,
              about,
              age,
              gender,
              skills,
              photoURL,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
