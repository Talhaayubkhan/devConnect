const ConnectionRequest = require("../models/request");
const User = require("../models/user");

const USER_DATA = "firstName lastName photoURL age gender skills about";

const receiveRequest = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // Find all requests where I am the receiver (toUserId)
    // and the request status is still "interested" (pending)
    const findConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_DATA); // show details of the sender

    res.status(200).json({
      message: "Pending requests fetched successfully",
      data: findConnectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR " + error.message);
  }
};

const showAcceptedConnections = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // Find all requests where I am either the sender (fromUserId)
    // OR the receiver (toUserId), and the status is "accepted"
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser, status: "accepted" },
        { fromUserId: loggedInUser, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA) // populate sender details
      .populate("toUserId", USER_DATA); // populate receiver details

    if (!connectionRequest || connectionRequest.length === 0) {
      return res.status(404).json({ msg: "No Connections Found!" });
    }

    // For each connection, return the OTHER user (not myself)
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser)) {
        return row.toUserId; // I was sender → return receiver
      } else {
        return row.fromUserId; // I was receiver → return sender
      }
    });

    res.status(200).json({
      message: "Connections fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

const showFeedData = async (req, res) => {
  try {
    // STEP 1: Get the logged-in user (only logged-in user can see feed)
    const loggedInUser = req.user._id;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // STEP 2: Find all connection requests where this user is involved
    // - either sent a request or received a request
    const showFeedData = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser }, { toUserId: loggedInUser }],
    }).select("fromUserId toUserId");

    // STEP 3: Create a Set (unique list) of users to hide from feed
    // Why? Because if a request already exists (sent or received),
    // we don't want to show them again in feed.
    const hideUserFromFeed = new Set();

    // Loop through all requests and add both sender and receiver
    // Example: if user1 sent to user2, we hide both user1 and user2
    showFeedData.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString()); // sender
      hideUserFromFeed.add(req.toUserId.toString()); // receiver
    });

    // STEP 4: Find all users from DB
    // Exclude: - loggedIn user (you don’t want to see yourself in feed)
    // - users in hideUserFromFeed (those already connected/requested)

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } }, // not in hidden list
        { _id: { $ne: loggedInUser } }, // not myself
      ],
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    // STEP 5: Send remaining users as feed (people you can connect with)
    res.status(200).json({
      message: "Feed data send Successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  receiveRequest,
  showAcceptedConnections,
  showFeedData,
};
