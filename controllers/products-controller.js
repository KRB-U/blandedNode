import fs from "fs/promises";
import path from "path";
import { ObjectId } from "bson";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { readFile, updateById } from "../services/servise.js";

const pathToDb = path.resolve("db", "products.json");

async function getAllProducts(req, res, next) {
  const products = await readFile();
  res.json(products);
}

async function addNewProduct(req, res, next) {
  const product = {
    ...req.body,
    id: new ObjectId(),
    sale: 0,
    imgURL:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-picture&psig=AOvVaw0XES_cVu4_y8Gs2hZdFNLM&ust=1702755042065000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiFzP6WkoMDFQAAAAAdAAAAABAD",
  };

  const products = await readFile();
  products.push(product);

  await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

  res.status(201).json(product);
}

async function updateByIdController(req, res, next) {
  const { id } = req.params;
  console.log("qwert", req.body);
  const result = await updateById(id, req.body);

  res.json(result);
}
export default {
  addNewProduct: ctrlWrapper(addNewProduct),
  getAllProducts: ctrlWrapper(getAllProducts),
  updateByIdController: ctrlWrapper(updateByIdController),
};
