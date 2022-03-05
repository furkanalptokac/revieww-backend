import Joi from 'joi';
import { IRegisterValidation, ILoginValidation } from './authValidation.type';

const registerValidation = (data: IRegisterValidation) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().min(1).max(30).required(),
    surname: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    bio: Joi.string(),
    languages: Joi.array(),
  });

  return schema.validate(data);
};

const loginValidation = (data: ILoginValidation) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
  });

  return schema.validate(data);
};

export { registerValidation, loginValidation };
