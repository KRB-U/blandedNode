import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envConfig.js";

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

export const login = async (body) => {
  const { email, password } = body;
  const availableUser = await User.findOne({ email });
  if (!availableUser) {
    throw HttpError(404, "User is not defined");
  }

  const userAccept = bcrypt.compare(password, availableUser.password);

  if (!userAccept) {
    throw HttpError(400, "email or password is wrong");
  }

  const payload = {
    id: availableUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  return { user: { email: availableUser.email }, token };
};
