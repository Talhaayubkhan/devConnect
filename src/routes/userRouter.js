const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/request");

// get all the pending (interested) connection of user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    //   find all the connections
    const findConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName photoURL age gender skills about"
    );

    if (!findConnectionRequests || findConnectionRequests.length === 0) {
      return res.status(404).json({ message: "No Pending Requests Found" });
    }

    res.status(200).json({
      message: "Data Fetched Successfully!",
      data: findConnectionRequests,
    });
  } catch (error) {
    return res.status(400).send("ERROR " + error.message);
  }
});

module.exports = userRouter;
