// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { login, register, valrefreshToken, logout } from '../services/auth.service';
import { validateRegister, validateLogin, validateRefreshToken } from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';

// Define interface for the user type
interface AuthUser {
  id: bigint;
  email: string;
  username: string;
}

export const registerController = [
  validateRegister,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name,email, username, password,gender } = req.body;
      const result = await register(name, email, username, password,gender);
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

export const logoutController = [
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Cast the user object to include bigint id
      const user = req.user as AuthUser;
      const result = await logout(user.id);
      res.json({
        success: true,
        message: 'Logout berhasil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];