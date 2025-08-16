const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://talhaayub:hello2002@cluster0.78mtw8c.mongodb.net/DevConnect"
  );
};
module.exports = connectDB;
