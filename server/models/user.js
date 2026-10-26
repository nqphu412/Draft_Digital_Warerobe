import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

const User = mongoose.model("User", UserSchema);
export default User;