import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 4,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const UserModel = model("user", userSchema);

export default UserModel;
