"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
// src/services/auth.service.ts
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const prisma = new client_1.PrismaClient();
const register = (email, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Cek apakah email atau username sudah digunakan
    const existingUser = yield prisma.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
    });
    if (existingUser) {
        throw new Error('Email atau username sudah digunakan');
    }
    // Hash password sebelum disimpan
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Simpan user baru ke database
    const newUser = yield prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
    });
    // Buat token JWT untuk user baru
    const accessToken = jsonwebtoken_1.default.sign({ userId: newUser.id }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.accessExpiration });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: newUser.id }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.refreshExpiration });
    // Simpan refresh token ke database
    yield prisma.refreshToken.create({
        data: {
            userId: newUser.id,
            token: refreshToken,
        },
    });
    return { accessToken, refreshToken };
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { email } });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.accessExpiration });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.refreshExpiration });
        yield prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
            },
        });
        return { accessToken, refreshToken };
    }
    else {
        throw new Error('Invalid credentials');
    }
});
exports.login = login;
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = yield prisma.refreshToken.findUnique({ where: { token } });
    if (refreshToken) {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        const accessToken = jsonwebtoken_1.default.sign({ userId: payload.userId }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.accessExpiration });
        return { accessToken };
    }
    else {
        throw new Error('Invalid refresh token');
    }
});
exports.refreshToken = refreshToken;
