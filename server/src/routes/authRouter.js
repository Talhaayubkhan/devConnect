const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHashed,
    });
    await user.save();

    res.status(201).json({
      message: "Account created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(400).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // first we check the email and password

    const { emailId, password } = req.body;

    // check if email exist
    const user = await User.findOne({ emailId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please sign up!" });
    }

    // now compare the password
    const isPasswordCorrect = await user.isPasswordValid(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await user.getJWTAuthToken();
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = authRouter;
