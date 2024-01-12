import { app } from "./app.js";
import { Schema, model } from "mongoose";
import "dotenv/config";

const { PORT, DB_HOST } = process.env;

const productSchema = new Schema({
  name: { type: String, default: "hahaha" },
  price: { type: Number, min: 1, index: true },
  sale: { type: Number, match: /[a-z]/ },
  imgURL: { type: String },
  buff: Buffer,
});

app.listen(PORT, () => {
  console.log("start serv on 3005 port");
});
