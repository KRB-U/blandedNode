import express from "express";
import {
  addNewProduct,
  getAllProducts,
} from "../../controllers/products-controller.js";
import { validateNewProduct } from "../../middleware/validate-products.js";

export const productsRouters = express.Router();

productsRouters.get("/", validateNewProduct, getAllProducts);

productsRouters.post("/", addNewProduct);
