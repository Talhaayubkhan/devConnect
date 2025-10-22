// routes/authRouter.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

// Auth routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
