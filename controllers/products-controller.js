import fs from "fs/promises";
import path from "path";
import { ObjectId } from "bson";

const pathToDb = path.resolve("db", "products.json");

const readFile = async () => {
  try {
    const ourProducts = await fs.readFile(pathToDb);

    return JSON.parse(ourProducts);
  } catch (err) {
    throw err;
  }
};

async function getAllProducts(req, res, next) {
  try {
    const products = await readFile();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function addNewProduct(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export { addNewProduct, getAllProducts };
