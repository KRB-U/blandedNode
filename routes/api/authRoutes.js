import express from "express";
import { validateUser } from "../../middleware/validate-user.js";
import { register } from "../../controllers/auth-controller.js";
export const authRouter = express.Router();

authRouter.post("/register", validateUser, register);
