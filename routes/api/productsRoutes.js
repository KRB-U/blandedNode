import express from "express";
import {
  addNewProduct,
  getAllProducts,
  updateByIdController,
} from "../../controllers/products-controller.js";
import { validateNewProduct } from "../../middleware/validate-products.js";

const { JWT_SECRET } = process.env;
import "dotenv/config";
import jwt from "jsonwebtoken";
import UserModel from "../../models/products/User.js";

export const productsRouters = express.Router();

productsRouters.use(async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error("Not authorized");
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new Error("Not authorized");
    }
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error("Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

productsRouters.get("/", getAllProducts);

productsRouters.post("/", validateNewProduct, addNewProduct);
productsRouters.patch("/:id", updateByIdController);
