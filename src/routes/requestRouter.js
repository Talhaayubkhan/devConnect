const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/request");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // now lets handle the corner cases

      // 1: handle the status validation -> we only allow interested and ignored

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Incorrect Status..." });
      }

      // 2: check if we sent wrong toUserId, that does not exist in Database
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "User Does not Exist" });
      }

      // 3: handle the case if the request is already sent, existing request check!
      const isExistingRequest = await ConnectionRequest.findOne({
        $or: [
          // A -> B (if connection exist)
          { fromUserId, toUserId },
          // B - A (if already exist)
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isExistingRequest) {
        return res.status(400).json({ message: "Request already exists!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();

      res.status(200).json({
        message: "Connection request sent!",
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).json({
        message: "Bad Request",
        error: error.message,
      });
    }
  }
);

// accepting the request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // loggedInUser should accpet the request from the other user
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Incorrect Status..." });
      }

      const findConnectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!findConnectionRequest) {
        return res.status(404).json({ message: "No Request Found" });
      }

      findConnectionRequest.status = status;

      const data = await findConnectionRequest.save();

      return res.status(200).json({
        message: `Request ${status} successfully`,
        data,
      });
    } catch (error) {
      return res.status(400).send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;
