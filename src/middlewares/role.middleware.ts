// src/middlewares/role.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from './auth.middleware';

const prisma = new PrismaClient();

interface AuthUser {
  id: bigint;
  email: string;
}

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Pastikan pengguna sudah terautentikasi
      authenticate(req, res, async () => {
        const user = req.user as AuthUser;

        // Ambil data user beserta role-nya
        const userData = await prisma.user.findUnique({
          where: { id: Number(user.id) },
          include: { role: true }, // Include role untuk pengecekan
        });

        if (!userData || !userData.role) {
          return res.status(403).json({
            success: false,
            message: 'User does not have a valid role',
          });
        }

        // Periksa apakah role user sesuai dengan yang dibutuhkan
        if (userData.role.role_name !== requiredRole) {
          return res.status(403).json({
            success: false,
            message: `User does not have the required role: ${requiredRole}`,
          });
        }

        // Jika role sesuai, lanjutkan ke middleware/controller berikutnya
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};