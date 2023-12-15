import express from "express";
import {
  addNewProduct,
  getAllProducts,
  updateByIdController,
} from "../../controllers/products-controller.js";
import { validateNewProduct } from "../../middleware/validate-products.js";

export const productsRouters = express.Router();

productsRouters.get("/", getAllProducts);

productsRouters.post("/", validateNewProduct, addNewProduct);
productsRouters.patch("/:id", updateByIdController);
