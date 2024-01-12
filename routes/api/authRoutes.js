import express from "express";
import { validateUser } from "../../middleware/validate-user.js";
import ctrl from "../../controllers/auth-controller.js";
export const authRouter = express.Router();

authRouter.post("/register", validateUser, ctrl.register);
authRouter.post("/login", validateUser, ctrl.login);
