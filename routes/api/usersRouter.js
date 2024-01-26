import express from "express";
import { updateAvatar } from "../../controllers/users-controller.js";
import upload from "../../middleware/upload.js";

const usersRouter = express.Router();

usersRouter.patch("/avatars", upload.single("avatar"), updateAvatar);

export default usersRouter;
