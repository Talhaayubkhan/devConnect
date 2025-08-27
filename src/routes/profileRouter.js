const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile", userAuth, (req, res) => {
  const user = req.user;
  console.log(user);

  res.send(user);
});

profileRouter.patch("/profile/:userId", async (req, res) => {
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
module.exports = profileRouter;
