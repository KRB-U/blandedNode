import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  price: Number,
  sale: {
    type: Number,
    default: 0,
  },
  imgURL: String,
});

export const Product = model("product", productSchema);
