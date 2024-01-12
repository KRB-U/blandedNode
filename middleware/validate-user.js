import { userAuthSchema } from "../schemas/usersSchema.js";
import { HttpError } from "../helpers/httpError.js";
function validateUser(req, res, next) {
  console.log(req.body);
  try {
    const { error } = userAuthSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].context);
      throw HttpError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { validateUser };
