import { FaUserEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { SUPPORTED_GENDER } from "../constants/options";
import { useUserSaveProfile } from "../hooks/useUserSaveProfile";
import { FormField } from "./common/FormField";

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
    <div className="min-h-screen flex justify-center items-start py-10 px-6">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* ✏️ Left: Modernized Edit Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex justify-center"
        >
          <div
            data-theme="dark"
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-700/30 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
              <FaUserEdit className="text-2xl text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-white tracking-wide">
                Edit Your Profile
              </h2>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <motion.img
                src={
                  photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User Avatar"
                className="w-24 h-24 object-cover object-center rounded-full border-4 border-indigo-500 shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <p className="text-slate-400 text-sm mt-2 italic">
                Click “Save” to update changes
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/40 my-4"></div>

            {/* Fields */}
            <div className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  inputClass="bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-indigo-500"
                />
                <FormField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  inputClass="bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-indigo-500"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  label="Age"
                  type="number"
                  min={1}
                  value={age}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setAge(newValue < 1 ? 1 : newValue);
                  }}
                  placeholder="Enter age"
                  inputClass="bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-indigo-500"
                />

                <div>
                  <label className="text-slate-300 text-sm mb-1 block">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    {SUPPORTED_GENDER.map((g) => (
                      <option
                        key={g.value}
                        value={g.value}
                        className="text-slate-900 dark:text-white bg-white dark:bg-slate-800"
                      >
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <FormField
                label="Photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter image URL"
                inputClass="bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-indigo-500"
              />

              <FormField
                label="Skills"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value.split(",").map((s) => s.trim()))
                }
                placeholder="e.g. React, Node, MongoDB"
                inputClass="bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-indigo-500"
              />

              <FormField
                label="About"
                type="textarea"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write something about yourself..."
                inputClass="bg-slate-800 text-slate-100 dark:bg-slate-800 dark:text-white focus:ring-indigo-500"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
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
        </motion.div>

        {/* 👤 Right: Animated Live Preview */}
        <div className="flex justify-center flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key="user-card-preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm"
            >
              <UserCard
                variant="profile"
                editable
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
