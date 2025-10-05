const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utils/validation");

profileRouter.get("/profile", userAuth, (req, res) => {
  const user = req.user;
  // console.log(user);

  res.send(user);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // 1. Validate request

    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Req, Try Again!");
    }

    // 2. Find logged-in user
    const loggedInUser = req.user;

    // 3. Update fields dynamically
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // 4. Save updates
    await loggedInUser.save();

    res.status(200).json({
      message: `${loggedInUser?.firstName} Profile updated successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
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
});

module.exports = profileRouter;
