import { Request, Response, NextFunction } from 'express';
import { login,register, refreshToken } from '../services/auth.service';
import { validateRegister, validateLogin, validateRefreshToken } from '../validators/auth.validator';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  next();
};

// Register Controller
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
// Login Controller
export const loginController = [
  validateLogin,
  handleValidationErrors,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const tokens = await login(email, password);
      res.json(tokens);
    } catch (error: any) {
      next(error);
    }
  },
];

// Refresh Token Controller
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
