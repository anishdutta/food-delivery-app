import Joi from "joi";
import { ICreateResturantRequest, IGetResturantRequest } from "./restaurant.interface";

export const getRestaurants: Record<keyof IGetResturantRequest | 'token', any> = {
    deliveryTime:  Joi.string().required(),
    token: Joi.string().required()
};

export const addRestaurant: Record<keyof ICreateResturantRequest | 'token', any> = {
    name:  Joi.string().required(),
    serveStartTime:  Joi.date().required(),
    serveEndTime:  Joi.date().required(),
    token: Joi.string().required()
};