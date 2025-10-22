const mongoose = require("mongoose");
const { MONGODB_URI } = require("../utils/config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = connectDB;
