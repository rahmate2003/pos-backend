// src/validators/auth.validator.ts
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

// Middleware untuk validasi request
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    
    next();
  };
};

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
export const validateRefreshToken = validate(refreshTokenSchema);
