import Joi from "joi";

export const loginSchema =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
});

export const registerSchema =  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role:Joi.string().valid("USER")
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)),
    newPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)),
})