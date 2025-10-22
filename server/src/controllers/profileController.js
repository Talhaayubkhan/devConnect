const bcrypt = require("bcrypt");

const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validation");

const showProfile = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req, res) => {
  try {
    // 1️⃣ Validate Request Fields
    if (!validateProfileEditData(req)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid fields detected. Only editable fields can be updated.",
      });
    }

    // 2️⃣ Check if body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update.",
      });
    }

    // 3️⃣ Get Logged-in User from Middleware
    const loggedInUser = req.user;

    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please re-login.",
      });
    }

    // 4️⃣ Apply Updates Dynamically
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    // 5️⃣ Save Changes
    await loggedInUser.save();

    // 6️⃣ Return Success Response
    res.status(200).json({
      success: true,
      message: `${
        loggedInUser.firstName || "User"
      }'s profile updated successfully.`,
      user: {
        id: loggedInUser._id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        age: loggedInUser.age,
        photoURL: loggedInUser.photoURL,
        about: loggedInUser.about,
        gender: loggedInUser.gender,
        skills: loggedInUser.skills,
      },
    });
  } catch (error) {
    console.error("Error in /profile/edit:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const editPassword = async (req, res) => {
  try {
    // check the current password and existing user
    const { emailId, password, newPassword } = req.body;

    // first we find the user exist
    const isUserExist = await User.findOne({ emailId });
    if (!isUserExist) {
      throw new Error("User does not exist, please sign up!");
    }

    // 2. Verify current password
    const isCorrectPassword = await isUserExist.isPasswordValid(password);

    if (!isCorrectPassword) {
      throw new Error("Current password is incorrect");
    }

    // 3. Check if new password is same as old password
    const isSamePassword = await isUserExist.isPasswordValid(newPassword);
    if (isSamePassword) {
      throw new Error(
        "New password must be different from the current password"
      );
    }

    //4. Now hash the new password
    const hashUpdatedPassword = await bcrypt.hash(newPassword, 10);

    isUserExist.password = hashUpdatedPassword;
    await isUserExist.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json("ERROR ", error.message);
  }
};
module.exports = { showProfile, editProfile, editPassword };
