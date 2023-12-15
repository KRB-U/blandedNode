import { postProductSchema } from "../schemas/productsSchemas.js";

function validateNewProduct(req, res, next) {
  try {
    const { error } = postProductSchema.validate(req.body);
    if (error) {
      const newError = new Error(error.message);
      newError.status = 400;
      throw newError;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { validateNewProduct };
