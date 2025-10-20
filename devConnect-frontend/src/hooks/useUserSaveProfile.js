import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux-toolkit/slices/userSlice";

import { toast } from "react-toastify";
import api from "../api/axios";

export const useUserSaveProfile = (user) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [isOnSaveLoading, setIsOnSaveLoading] = useState(false);

  const dispatch = useDispatch();

  const saveProfileData = async () => {
    try {
      setIsOnSaveLoading(true);

      const payload = {
        firstName,
        lastName,
        photoURL,
        age,
        gender,
        about,
        skills,
      };

      const res = await api.patch(`/profile/edit`, payload);

      if (res?.data?.success) {
        dispatch(addUser(res?.data?.user));
        toast.success(res.data.message || "Profile updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      if (error?.response) {
        toast.error(error.response.data?.message || "Invalid data provided.");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsOnSaveLoading(false);
    }
  };

  return {
    firstName,
    lastName,
    photoURL,
    age,
    gender,
    about,
    skills,
    isOnSaveLoading,
    setFirstName,
    setLastName,
    setPhotoURL,
    setAge,
    setGender,
    setAbout,
    setSkills,
    saveProfileData,
  };
};
