import { Request, Response, NextFunction } from 'express';
import { login,register, refreshToken } from '../services/auth.service';
import { handleValidationErrors,validateRegister, validateLogin, validateRefreshToken } from '../validators/auth.validator';


export const registerController = [
  validateRegister,
  handleValidationErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      const tokens = await register(email, username, password);

      res.status(201).json({ message: 'Registrasi berhasil', tokens });
    } catch (error) {
      next(error);
    }
  }
];

export const loginController = [
  validateLogin,
  handleValidationErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const tokens = await login(username, password);
      res.json(tokens);
    } catch (error: any) {
      next(error);
    }
  },
];

export const refreshTokenController = [
  validateRefreshToken,
  handleValidationErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await refreshToken(refreshToken);
      res.json(tokens);
    } catch (error: any) {
      next(error);
    }
  },
];
