"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.validateLogin = exports.validateRegister = exports.validate = exports.registerSchema = void 0;
// src/validators/auth.validator.ts
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(6).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
const refreshTokenSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
// Middleware untuk validasi request
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ errors: error.details.map((err) => err.message) });
        }
        next();
    };
};
exports.validate = validate;
exports.validateRegister = (0, exports.validate)(exports.registerSchema);
exports.validateLogin = (0, exports.validate)(loginSchema);
exports.validateRefreshToken = (0, exports.validate)(refreshTokenSchema);
