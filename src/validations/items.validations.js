import Joi from "joi";

export const validateItem = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required()
});

export const validateChangeItem = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0),
    stock: Joi.number().min(0),
});