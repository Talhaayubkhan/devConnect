// Load environment variables
require("dotenv").config();

// Connect to database & start server
const PORT = process.env.PORT || 4000; // Use PORT from env or fallback to 4000
const MONGODB_URI = process.env.MONGO_URI;
const FRONTEND_URLS = process.env.FRONTEND_URLS.split(",").map((url) =>
  url.trim()
);

const CORS_CONFIG = {
  origin: FRONTEND_URLS,
  credentials: true,
};

module.exports = {
  PORT,
  MONGODB_URI,
  CORS_CONFIG,
};
