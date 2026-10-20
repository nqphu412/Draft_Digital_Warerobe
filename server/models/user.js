const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    required: [true, "Username is required"],
    type: String,
  },
  password: {
    required: [true, "Password is required"],
    type: String,
  },
});

module.exports = mongoose.mongoose.model("User", UserSchema);
