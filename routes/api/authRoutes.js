import express from "express";
import { User } from "../../models/user.js";
import { HttpError } from "../../helpers/httpError.js";

export const authRouter = express.Router();
import bcrypt from "bcrypt";

authRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const availableUser = await User.findOne({ email });

    if (availableUser) {
      throw HttpError(409, "email is already in use");
    }
    const decPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: decPassword });

    res.status(201).json({ email: newUser.email });
  } catch (error) {
    next(error);
  }
});
