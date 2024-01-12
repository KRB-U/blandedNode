import fs from "fs/promises";
import path from "path";
import { ObjectId } from "bson";
import { readFile, updateById } from "../services/servise.js";
import ProductModel from "../models/products/Products.js";

const pathToDb = path.resolve("db", "products.json");

async function getAllProducts(req, res, next) {
  try {
    const products = await ProductModel.find();
    res.json(products);

    // const products = await readFile();
    // res.json(products);
  } catch (error) {
    next(error);
  }
}

async function addNewProduct(req, res, next) {
  try {
    const addProduct = await ProductModel.create(req.body);
    res.status(201).json(addProduct);

    // const product = {
    //   ...req.body,
    //   id: new ObjectId(),
    //   sale: 0,
    //   imgURL:
    //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-picture&psig=AOvVaw0XES_cVu4_y8Gs2hZdFNLM&ust=1702755042065000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiFzP6WkoMDFQAAAAAdAAAAABAD",
    // };

    // const products = await readFile();
    // products.push(product);

    // await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

    // res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function updateByIdController(req, res, next) {
  try {
    const { id } = req.params;
    console.log("qwert", req.body);
    const result = await updateById(id, req.body);

    res.json(result);
  } catch (error) {
    next(error);
  }
}
export { addNewProduct, getAllProducts, updateByIdController };
