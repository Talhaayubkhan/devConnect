const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/request");

const USER_DATA = "firstName lastName photoURL age gender skills about";

// get all the pending (interested) connection of user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    //   find all the connections
    const findConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

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

// now see connections for fromUserId(A) and also toUserId(B)

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    // check the authenticate user
    const loggedInUser = req.user._id;

    // find all the connection user
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);
    if (!connectionRequest) {
      return res.status(404).json({ msg: "No Connection Found!" });
    }

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser)) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(400).send("ERROR: ", error.message);
  }
});

module.exports = userRouter;
