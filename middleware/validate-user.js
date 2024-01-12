import { userAuthSchema } from "../schemas/usersSchema.js";
import { HttpError } from "../helpers/httpError.js";
function validateUser(req, res, next) {
  try {
    const { error } = userAuthSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { validateUser };
