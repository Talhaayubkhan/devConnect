const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  sendRequest,
  acceptRequest,
} = require("../controllers/requestController");

requestRouter.post("/request/send/:status/:toUserId", userAuth, sendRequest);

// accepting the request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  acceptRequest
);

module.exports = requestRouter;
