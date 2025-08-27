require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");
const connectDB = require("./db/database");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHashed,
    });

    await user.save();

    res.send("User Create Successfully!");
  } catch (error) {
    res.status(400).send("Error While Creating User: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // first we check the email and password

    const { emailId, password } = req.body;

    // check if email exist
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error(400).send("invalid crediontial, please sign up!");
    }

    // now compare the password
    const isPasswordCorrect = await user.isPasswordValid(password);

    if (isPasswordCorrect) {
      // if password is correct, now create JWT!
      const token = await user.getJWTAuthToken();

      // now we attach this token with cookie
      res.cookie("token", token);

      res.send("Login Success!");
    } else {
      throw new Error("Invalid Credentiols");
    }
  } catch (error) {
    return res.status(400).send("ERROR: " + error);
  }
});

app.get("/profile", userAuth, (req, res) => {
  const user = req.user;
  console.log(user);

  res.send(user);
});

app.get("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Connection Request Send!");

  res.send(`${user.firstName} ${user.lastName} has send the request....`);
});

app.patch("/profile/:userId", async (req, res) => {
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
