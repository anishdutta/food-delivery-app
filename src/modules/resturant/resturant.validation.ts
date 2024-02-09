import Joi from "joi";
import { ICreateResturantRequest, IGetResturantRequest } from "./resturant.interface";

export const getResturants: Record<keyof IGetResturantRequest | 'token', any> = {
    deliveryTime:  Joi.string().required(),
    token: Joi.string().required()
};

export const addResturant: Record<keyof ICreateResturantRequest | 'token', any> = {
    name:  Joi.string().required(),
    serveStartTime:  Joi.date().required(),
    serveEndTime:  Joi.date().required(),
    token: Joi.string().required()
};