import express from "express";
import { validateUser } from "../../middleware/validate-user.js";
import ctrl from "../../controllers/auth-controller.js";
export const authRouter = express.Router();
import upload from "../../middleware/upload.js";

authRouter.post("/register", upload.single("img"), validateUser, ctrl.register);
authRouter.post("/login", upload.none(), validateUser, ctrl.login);
