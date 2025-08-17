require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./models/user");
const connectDB = require("./db/database");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    const data = req.body;
    if (!data) {
      throw new Error("Please Provide User Data!");
    }
    const user = User(data);
    if (!user) {
      throw new Error("User Data is not valid!");
    }

    await user.save();

    res.send("User Create Successfully!");
  } catch (error) {
    res.status(400).send("Error While Creating User: " + error.message);
  }
});

app.patch("/profile", async (req, res) => {
  const userId = req.body.userId;
  const data = Object.keys(req.body);

  try {
    const AllowedUpdates = [
      "userId",
      "skills",
      "age",
      "about",
      "photoURL",
      "password",
    ];

    const isValid = data.every((k) => AllowedUpdates.includes(k));
    if (!isValid) {
      throw new Error("Updates Are Not Allowed, Try Again! ");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills Cannot be more then 10!");
    }

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
