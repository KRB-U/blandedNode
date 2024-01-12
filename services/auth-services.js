import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export const register = async (body) => {
  const { email, password } = body;
  const availableUser = await User.findOne({ email });

  if (availableUser) {
    throw HttpError(409, "email is already in use");
  }
  const decPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...body, password: decPassword });
  return { email: newUser.email };
};
