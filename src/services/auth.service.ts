// src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const prisma = new PrismaClient();

export const register = async (email: string, username: string, password: string) => {
  
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    throw new Error('Email atau username sudah digunakan');
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  
  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  
  const accessToken = jwt.sign(
    { userId: newUser.id },
    config.jwt.secret,
    { expiresIn: config.jwt.accessExpiration }
  );

  const refreshToken = jwt.sign(
    { userId: newUser.id },
    config.jwt.secret,
    { expiresIn: config.jwt.refreshExpiration }
  );

  
  await prisma.refreshToken.create({
    data: {
      userId: newUser.id,
      token: refreshToken,
    },
  });

  return { accessToken, refreshToken };
};

export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: config.jwt.accessExpiration });
    const refreshToken = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: config.jwt.refreshExpiration });

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const refreshToken = async (token: string) => {
  const refreshToken = await prisma.refreshToken.findUnique({ where: { token } });

  if (refreshToken) {
    const payload = jwt.verify(token, config.jwt.secret) as { userId: number };
    const accessToken = jwt.sign({ userId: payload.userId }, config.jwt.secret, { expiresIn: config.jwt.accessExpiration });
    return { accessToken };
  } else {
    throw new Error('Invalid refresh token');
  }
};