// src/services/auth.service.ts
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import createHttpError from 'http-errors';
import redisClient from '../utils/redis';
import { serializeUser } from '../utils/serialize';
const prisma = new PrismaClient();
enum Gender {
  MALE = "male",
  FEMALE = "female"
}


export const generateTokens = async (userId: bigint) => {
  const accessToken = jwt.sign(
    { userId: userId.toString() }, 
    config.jwt.secret, 
    { expiresIn: config.jwt.accessExpiration }
  );

  const refreshToken = jwt.sign(
    { userId: userId.toString() }, 
    config.jwt.Refreshsecret, 
    { expiresIn: config.jwt.refreshExpiration }
  );

  const redisKey = `refresh_token:${userId.toString()}`;
  await redisClient.setEx(
    redisKey,
    config.jwt.refreshExpiration,
    refreshToken
  );

  return { accessToken, refreshToken };
};

export const register = async (
  name: string,
  email: string,
  password: string,
  gender: Gender,
  roleName: string
) => {

  const normalizedEmail = email.toLowerCase();

  const existingEmail = await prisma.user.findFirst({
    where: { email: normalizedEmail },
  });

  if (existingEmail) {
    throw createHttpError(409, 'Email already Registered');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const role = await prisma.role.findUnique({
    where: { role_name: roleName },
  });

  if (!role) {
    throw createHttpError(400, 'Role not found');
  }

  const user = await prisma.user.create({
    data: {
      name,
      email:normalizedEmail,
      password: hashedPassword,
      gender,
      role_id: role.id,
    },
  });

  return serializeUser(user); // Serialize before returning
};
export const login = async (email: string, password: string, roleName: string) => {
    
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email:normalizedEmail },
    include: { role: true }, // Include role untuk pengecekan
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Email or password wrong');
  }

  // Pengecekan role
  if (user.role.role_name !== roleName) {
    throw createHttpError(403, 'You do not have permission to access this endpoint');
  }

  const tokens = await generateTokens(user.id);
  return { tokens };
};
export const valrefreshToken = async (token: string) => {
  if (!token) {
    throw createHttpError(400, 'Refresh token is required');
  }

  try {
    const payload = jwt.verify(token, config.jwt.Refreshsecret) as { userId: string };
    const storedToken = await redisClient.get(`refresh_token:${payload.userId}`);

    if (!storedToken || storedToken !== token) {
      throw createHttpError(403, 'Invalid refresh token');
    }

    const tokens = await generateTokens(BigInt(payload.userId));
    return { tokens };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw createHttpError(403, 'Invalid refresh token');
    }
    throw error;
  }
};

export const logout = async (userId: bigint) => {
  const redisKey = `refresh_token:${userId.toString()}`;
  await redisClient.del(redisKey);
  return { message: 'Logged out successfully' };
};