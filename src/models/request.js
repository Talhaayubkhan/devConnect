const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accept", "rejected"],
        message: "${VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

// This runs BEFORE saving any new connection request.
// Purpose: Prevent a user from sending a request to themselves.
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this; // `this` is the current document being saved

  // If senderId === receiverId, throw an error
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send a connection request to yourself!");
  }

  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
