import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, default: "hahaha" },
    price: { type: Number, min: 1, index: true },
    sale: { type: Number, match: /[a-z]/ },
    imgURL: { type: String },
    // buff: Buffer,
  },
  { versionKey: false, timestamps: true }
);

const ProductModel = model("product", productSchema);

export default ProductModel;
