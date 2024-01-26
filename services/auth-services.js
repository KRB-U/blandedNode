import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envConfig.js";

import fs from "fs/promises";
import path from "path";

import { HttpError } from "../helpers/httpError.js";
import { sendMail } from "../mailer.js";
import { nanoid } from "nanoid";
const publicFolder = path.resolve("public");

export const register = async (body, file) => {
  const { email, password } = body;

  const availableUser = await User.findOne({ email });

  if (availableUser) {
    throw HttpError(409, "email is already in use");
  }

  const verifCode = nanoid();

  const verifEmail = {
    to: email,
    subject: "email confirm",
    text: "підтвердження пошти",
    html: `<a href="http://localhost:3000/api/auth/verify/${verifCode}">тиць</a>`,
  };

  await sendMail(verifEmail);

  const decPassword = await bcrypt.hash(password, 10);

  const { path: oldPath, filename } = file;

  const newPath = path.join(publicFolder, filename);

  await fs.rename(oldPath, newPath);

  const avatar = path.join("public", filename);

  const newUser = await User.create({
    ...body,
    password: decPassword,
    verifCode,
    img: avatar,
  });

  return { email: newUser.email };
};

export const login = async (body) => {
  const { email, password } = body;
  const availableUser = await User.findOne({ email });

  if (!availableUser) {
    throw HttpError(404, "User is not defined");
  }

  if (!availableUser.verify) {
    throw HttpError(401, "invalid pass or email");
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

export const verUser = async (verifCode) => {
  const user = User.findOne({ verifCode });
  console.log(user._id);
  if (!user) {
    throw HttpError(400, "email not found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verifCode: "" });

  res.json({ message: "success" });
};
