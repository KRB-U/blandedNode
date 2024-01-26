import express from "express";
import { validateUser } from "../../middleware/validate-user.js";
import ctrl from "../../controllers/auth-controller.js";
import upload from "../../middleware/upload.js";
export const authRouter = express.Router();

authRouter.post("/register", validateUser, ctrl.register);
authRouter.post("/login", validateUser, ctrl.login);
authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  function (req, res, next) {
    console.log(req.file, req.body);
  }
);
