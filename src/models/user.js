const mongoose = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 4,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 4,
      maxlength: 45,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    age: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "transgender", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "this is software developer from pakistan!",
    },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-set-different-poses-white-background-illustration_632498-649.jpg?w=360",
      validate(value) {
        if (!validate.isURL(value)) {
          throw new Error("Photo URL is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWTAuthToken = async function () {
  const user = this;
  return await jwt.sign({ _id: user._id }, "KHAN@2002", {
    expiresIn: "1d",
  });
};

userSchema.methods.isPasswordValid = async function (passwordInputUser) {
  const hashedPassword = this.password;
  return await bcrypt.compare(passwordInputUser, hashedPassword);
};

module.exports = mongoose.model("User", userSchema);
