import express from "express";
import fs from "fs/promises";

export const productsRouters = express.Router();
import path from "path";

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
  readFile();
});
