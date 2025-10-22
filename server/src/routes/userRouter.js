const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  receiveRequest,
  showAcceptedConnections,
  showFeedData,
} = require("../controllers/userController");

// Get all pending connection requests RECEIVED by the logged-in user
userRouter.get("/user/request/received", userAuth, receiveRequest);

// Get all ACCEPTED connections of the logged-in user
userRouter.get("/user/connections", userAuth, showAcceptedConnections);

userRouter.get("/feed", userAuth, showFeedData);

module.exports = userRouter;
