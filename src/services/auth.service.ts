// src/services/auth.service.ts
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import createHttpError from 'http-errors';
import redisClient from '../utils/redis';
const prisma = new PrismaClient();


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

export const register = async (name:string,email: string, username: string, password: string,gender:any) => {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    throw createHttpError(409, 'Email atau username sudah digunakan');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create type-safe input data
  const userData: Prisma.UserCreateInput = {
    name,
    email,
    username,
    password: hashedPassword,
    gender
  };

  const newUser = await prisma.user.create({
    data: userData
  });

  const tokens = await generateTokens(newUser.id);
  return { 
    tokens 
  };
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Username atau password salah');
  }

  const tokens = await generateTokens(user.id);
  return { 
    user: { 
      id: user.id.toString(), 
      email: user.email, 
      username: user.username 
    }, 
    tokens 
  };
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