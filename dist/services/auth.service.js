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
exports.logout = exports.valrefreshToken = exports.login = exports.register = exports.generateTokens = void 0;
// src/services/auth.service.ts
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const http_errors_1 = __importDefault(require("http-errors"));
const redis_1 = __importDefault(require("../utils/redis"));
const prisma = new client_1.PrismaClient();
const generateTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign({ userId: userId.toString() }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.accessExpiration });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: userId.toString() }, config_1.default.jwt.Refreshsecret, { expiresIn: config_1.default.jwt.refreshExpiration });
    const redisKey = `refresh_token:${userId.toString()}`;
    yield redis_1.default.setEx(redisKey, config_1.default.jwt.refreshExpiration, refreshToken);
    return { accessToken, refreshToken };
});
exports.generateTokens = generateTokens;
const register = (name, email, username, password, gender) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = yield prisma.user.findFirst({
        where: { email },
    });
    if (existingEmail) {
        throw (0, http_errors_1.default)(409, 'Email already Registered');
    }
    const existingUsername = yield prisma.user.findFirst({
        where: { username },
    });
    if (existingUsername) {
        throw (0, http_errors_1.default)(409, 'Username already Registered');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Create type-safe input data
    const userData = {
        name,
        email,
        username,
        password: hashedPassword,
        gender
    };
    const newUser = yield prisma.user.create({
        data: userData
    });
    return;
});
exports.register = register;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { username } });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw (0, http_errors_1.default)(401, 'Username or password wrong');
    }
    const tokens = yield (0, exports.generateTokens)(user.id);
    return {
        tokens
    };
});
exports.login = login;
const valrefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw (0, http_errors_1.default)(400, 'Refresh token is required');
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.Refreshsecret);
        const storedToken = yield redis_1.default.get(`refresh_token:${payload.userId}`);
        if (!storedToken || storedToken !== token) {
            throw (0, http_errors_1.default)(403, 'Invalid refresh token');
        }
        const tokens = yield (0, exports.generateTokens)(BigInt(payload.userId));
        return { tokens };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw (0, http_errors_1.default)(403, 'Invalid refresh token');
        }
        throw error;
    }
});
exports.valrefreshToken = valrefreshToken;
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const redisKey = `refresh_token:${userId.toString()}`;
    yield redis_1.default.del(redisKey);
    return { message: 'Logged out successfully' };
});
exports.logout = logout;
