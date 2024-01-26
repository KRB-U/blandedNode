import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/httpError.js";
import { User } from "../models/User.js";
import * as s from "../services/auth-services.js";

const register = async (req, res, next) => {
  const userData = await s.register(req.body, req.file);

  res.status(201).json(userData);
};

const login = async (req, res, next) => {
  const userData = await s.login(req.body);

  res.status(201).json(userData);
};

const verifyUser = async (req, res, next) => {
  const userData = await s.verUser(req.params.verifCode);
  res.json(userData);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  verifyUser: ctrlWrapper(verifyUser),
};
