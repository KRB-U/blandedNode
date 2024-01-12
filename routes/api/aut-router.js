import express from "express";
import autController from "../../controllers/aut-controller.js";

const authRouter = express.Router();

authRouter.post("/register", autController.signup);

authRouter.post("/login", autController.signin);

export default authRouter;
