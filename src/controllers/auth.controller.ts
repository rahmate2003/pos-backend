// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { login, register, valrefreshToken, logout } from '../services/auth.service';
import { validateRegister, validateLogin, validateRefreshToken } from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';

interface AuthUser {
  id: bigint;
  email: string;
}
export const registerController = [
  validateRegister,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, gender, role } = req.body;
      const result = await register(name, email, password, gender, role);
      res.status(201).json({
        success: true,
        message: 'User Created',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];
export const superAdminLoginController = [
  validateLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await login(email, password, 'super_admin');
      res.json({
        success: true,
        message: 'Super Admin Login',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const ownerLoginController = [
  validateLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await login(email, password, 'owner');
      res.json({
        success: true,
        message: 'Owner Login',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const adminLoginController = [
  validateLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await login(email, password, 'admin_toko');
      res.json({
        success: true,
        message: 'Admin Login',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const kasirLoginController = [
  validateLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await login(email, password, 'kasir_toko');
      res.json({
        success: true,
        message: 'Admin Login',
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