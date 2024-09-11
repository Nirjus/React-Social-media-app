import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
      maxLength: [30, "Name must be under 30 character"],
      minLength: [3, "Name contains atlist 3 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Please enater a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      set: (v) => bcryptjs.hashSync(v, bcryptjs.genSaltSync(10)),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
