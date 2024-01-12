import * as s from "../services/auth-services.js";

const register = async (req, res, next) => {
  try {
    const userData = await s.register(req.body);

    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

export { register };
