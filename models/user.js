import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
