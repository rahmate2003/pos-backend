//src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { login, register, valrefreshToken } from '../services/auth.service';
import { validateRegister, validateLogin, validateRefreshToken } from '../validators/auth.validator';

export const registerController = [
  validateRegister,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      const result = await register(email, username, password);
      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const loginController = [
  validateLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const result = await login(username, password);
      res.json({
        success: true,
        message: 'Login berhasil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const refreshTokenController = [
  validateRefreshToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await valrefreshToken(refreshToken);
      res.json({
        success: true,
        message: 'Token berhasil diperbarui',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];
