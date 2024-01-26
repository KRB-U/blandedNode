import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as s from "../services/auth-services.js";

const register = async (req, res, next) => {
  const userData = await s.register(req.body);

  console.log(req.file);

  res.status(201).json(userData);
};

const login = async (req, res, next) => {
  const userData = await s.login(req.body);

  res.status(201).json(userData);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
