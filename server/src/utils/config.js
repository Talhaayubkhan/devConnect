// Load environment variables
require("dotenv").config();

// Connect to database & start server
const PORT = process.env.PORT || 4000; // Use PORT from env or fallback to 4000
const MONGODB_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const CORS_CONFIG = {
  origin: FRONTEND_URL, // Allow frontend origin
  credentials: true, // Allow cookies to be sent
};

module.exports = {
  PORT,
  MONGODB_URI,
  CORS_CONFIG,
  FRONTEND_URL,
};
