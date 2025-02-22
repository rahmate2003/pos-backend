"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.validateLogin = exports.validateRegister = exports.registerSchema = void 0;
// src/validators/auth.validator.ts
const joi_1 = __importDefault(require("joi"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(64).required(),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(6).required(),
    gender: joi_1.default.string().valid('male', 'female').required(),
});
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(6).required(),
});
const refreshTokenSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.validateRegister = (0, validate_middleware_1.validate)(exports.registerSchema);
exports.validateLogin = (0, validate_middleware_1.validate)(loginSchema);
exports.validateRefreshToken = (0, validate_middleware_1.validate)(refreshTokenSchema);
