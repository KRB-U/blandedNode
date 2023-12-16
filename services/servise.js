import { HttpError } from "../helpers/index.js";
import fs from "fs/promises";
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

async function getProductByID(id) {
  try {
    const products = await readFile();
    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return null;
    }

    return products[productIndex];
  } catch (error) {
    throw error;
  }
}

async function updateById(id, body) {
  try {
    const products = await readFile();
    const productIndex = products.findIndex(
      (item) => String(item.id) === String(id)
    );

    if (productIndex === -1) {
      throw HttpError(404);
    }

    const newProduct = { ...products[productIndex], ...body };
    products[productIndex] = newProduct;

    await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

    return newProduct;
  } catch (error) {
    throw error;
  }
}
export { getProductByID, readFile, updateById };
