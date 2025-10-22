// Core Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PORT, CORS_CONFIG } = require("./utils/config");

// Initialize Express App
const app = express();
// Database Connection
const connectDB = require("./db/database");

// Middlewares
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(cookieParser());

// Routes
const routes = require("./routes");
app.use("/", routes);

// Server + Database
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
