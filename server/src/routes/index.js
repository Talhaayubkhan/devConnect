// routes/index.js
const express = require("express");
const router = express.Router();

// Import all route modules
const authRouter = require("./authRouter");
const profileRouter = require("./profileRouter");
const requestRouter = require("./requestRouter");
const userRouter = require("./userRouter");

// Mount routers
router.use("/", authRouter);
router.use("/", profileRouter);
router.use("/", requestRouter);
router.use("/", userRouter);

module.exports = router;
