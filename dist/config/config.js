"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        accessExpiration: parseInt(process.env.JWT_ACCESS_EXPIRATION || '900', 10), // 900 detik = 15 menit
        refreshExpiration: parseInt(process.env.JWT_REFRESH_EXPIRATION || '604800', 10), // 7 hari dalam detik
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    database: {
        url: process.env.DATABASE_URL || 'mysql://user:password@localhost:3306/pos_fnb',
    },
};
