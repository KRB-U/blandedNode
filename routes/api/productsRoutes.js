import express from "express";
import ctrl from "../../controllers/products-controller.js";
import { validateNewProduct } from "../../middleware/validate-products.js";

export const productsRouters = express.Router();

productsRouters.get("/", ctrl.getAllProducts);

productsRouters.post("/", validateNewProduct, ctrl.addNewProduct);
productsRouters.patch("/:id", ctrl.updateByIdController);
