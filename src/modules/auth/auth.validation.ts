import Joi from "joi";
import { IRegisterUserRequest, IUserRoles } from "../user/user.interfaces";

const registerBody: Record<keyof IRegisterUserRequest, any> = {
  email: Joi.string().optional().email(),
  password: Joi.string().required(),
  name: Joi.string().optional(),
  username: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  role: Joi.string().required().valid(...Object.values(IUserRoles)),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
    username: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    role: Joi.string().required(),
    email: Joi.string().optional(),
    password: Joi.string().required(),
};

export const logout = {
    refreshToken: Joi.string().required(),
};

export const refreshTokens = {
    refreshToken: Joi.string().required(),
};
