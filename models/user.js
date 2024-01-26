import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    img: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verifCode: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
