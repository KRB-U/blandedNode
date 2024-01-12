import Joi from "joi";

export const userAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.number().min(6).required(),
});
