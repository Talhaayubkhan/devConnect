const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // extract the token
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token Not Valid, try again!");
    }
    // then verify it via jwt
    const { _id } = await jwt.verify(token, "KHAN@2002");

    // find the user via this id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error(`User not found with this ${_id}, try again`);
    }

    // attach this user with req;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("ERROR " + error.message);
  }
};

module.exports = {
  userAuth,
};
