// src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();
export const generateTokens = async (userId: number) => {
  const accessToken = jwt.sign(
    { userId }, config.jwt.secret, { expiresIn: config.jwt.accessExpiration }
  );

 const refreshToken = jwt.sign(
    { userId }, config.jwt.Refreshsecret, { expiresIn: config.jwt.refreshExpiration }
  );

  await prisma.refreshToken.deleteMany({ where: { Id } });
  await prisma.refreshToken.create({ data: { userId, token: refreshToken } });

  return { accessToken, refreshToken };
};

export const register = async (email: string, username: string, password: string) => {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    throw createHttpError(409, 'Email atau username sudah digunakan');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  });

  const tokens = await generateTokens(newUser.id);
  return { user: { id: newUser.id, email: newUser.email, username: newUser.username }, tokens };
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Username atau password salah');
  }

  const tokens = await generateTokens(user.id);
  return { user: { id: user.id, email: user.email, username: user.username }, tokens };
};
export const valrefreshToken = async (token: string) => {
  if (!token) {
    throw createHttpError(400, 'Refresh token is required');
  }

  const existingToken = await prisma.refreshToken.findFirst({ 
    where: { token },
  });

  if (!existingToken) {
    throw createHttpError(403, 'Invalid refresh token');
  }

  const payload = jwt.verify(token, config.jwt.Refreshsecret) as { userId: number };

  const tokens = await generateTokens(payload.userId);

  return { tokens };
};

