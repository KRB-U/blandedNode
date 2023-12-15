import express from "express";
import fs from "fs/promises";
import { ObjectId } from "bson";
export const productsRouters = express.Router();
import path from "path";
import { postProductSchema } from "../../schemas/productsSchemas.js";

const pathToDb = path.resolve("db", "products.json");

const readFile = async () => {
  try {
    const ourProducts = await fs.readFile(pathToDb);

    return JSON.parse(ourProducts);
  } catch (err) {
    throw err;
  }
};

productsRouters.post("/", async (req, res, next) => {
  try {
    const { error } = postProductSchema.validate(req.body);
    if (error) {
      const newError = new Error(error.message);
      newError.status = 400;
      throw newError;
    }
    const product = {
      ...req.body,
      id: new ObjectId(),
      sale: 0,
    };

    const products = await readFile();
    products.push(product);

    await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});
