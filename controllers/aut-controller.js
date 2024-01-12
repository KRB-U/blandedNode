import UserModel from "../models/products/User.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const decryptPassword = await bcrypt.hash(password, 10);

    const newUreqser = await UserModel.create({
      ...req.body,
      password: decryptPassword,
    });

    res.status(201).json(newUreqser);
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new Error("Email or password is wrong");
    }

    const { _id: id } = user;

    const payload = {
      id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await UserModel.findByIdAndUpdate(id, { token });

    res.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

export default {
  signup,
  signin,
};
