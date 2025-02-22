// src/validators/auth.validator.ts
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {validate} from '../middlewares/validate.middleware';
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid('male', 'female').required(),
   role: Joi.string().valid('super_admin','owner','admin_toko','kasir_toko','member','user').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});



export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
export const validateRefreshToken = validate(refreshTokenSchema);
