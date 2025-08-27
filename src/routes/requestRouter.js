const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Connection Request Send!");

  res.send(`${user.firstName} ${user.lastName} has send the request....`);
});

module.exports = requestRouter;
