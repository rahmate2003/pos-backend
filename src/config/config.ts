// src/config/config.ts
import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    Refreshsecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    accessExpiration: parseInt(process.env.JWT_ACCESS_EXPIRATION || '900', 10), 
    refreshExpiration: parseInt(process.env.JWT_REFRESH_EXPIRATION || '604800', 10), 
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  database: {
    url: process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/pos_fnb',
  },
};
