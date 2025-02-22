// src/middlewares/role.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from './auth.middleware';

const prisma = new PrismaClient();

// Define interface for the user type
interface AuthUser {
  id: bigint;
  email: string;
  username: string;
}

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure the user is authenticated
      authenticate(req, res, async () => {
        const user = req.user as AuthUser;

        // Find the user's role in the StoreUser table
        const storeUser = await prisma.storeUser.findFirst({
          where: {
            userId: user.id,
          },
          include: {
            Role: true,
          },
        });

        if (!storeUser) {
          return res.status(403).json({
            success: false,
            message: 'User does not have a role in any store',
          });
        }

        // Check if the user has the required role
        if (storeUser.Role.name !== requiredRole) {
          return res.status(403).json({
            success: false,
            message: `User does not have the required role`,
          });
        }

        // If the user has the required role, proceed to the next middleware
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};