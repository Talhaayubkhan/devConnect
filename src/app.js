const express = require("express");
const app = express();
const User = require("./models/user");
const connectDB = require("./db/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  const user = User(req.body);

  await user.save();

  res.send("User Create Successfully!");
});

app.patch("/profile", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const updateData = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    console.log(updateData);
    res.send("User Updated Successfully!");
  } catch (error) {
    res.status(400).send("Error While Updating" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
