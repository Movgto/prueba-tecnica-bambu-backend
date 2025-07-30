import * as Joi from 'joi';

export const environmentSchema = Joi.object({
    DATABASE_URL: Joi.required(),
    PORT: Joi.number().default(3002),
    JWT_SECRET: Joi.required()
});