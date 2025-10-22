// Import core dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PORT, CORS_CONFIG } = require("./utils/config");

// Initialize Express app
const app = express();

// Import database connection
const connectDB = require("./db/database");

// Middleware configuration
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(cookieParser());

// Import route modules
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

// Route handling
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Connect to DB and start server
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
