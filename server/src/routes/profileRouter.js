const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  showProfile,
  editProfile,
  editPassword,
} = require("../controllers/profileController");

profileRouter.get("/profile", userAuth, showProfile);
profileRouter.patch("/profile/edit", userAuth, editProfile);
profileRouter.patch("/profile/editPassword", userAuth, editPassword);

module.exports = profileRouter;
