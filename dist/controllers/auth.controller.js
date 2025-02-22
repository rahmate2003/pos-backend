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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.refreshTokenController = exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.registerController = [
    auth_validator_1.validateRegister,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, username, password, gender } = req.body;
            const result = yield (0, auth_service_1.register)(name, email, username, password, gender);
            res.status(201).json({
                success: true,
                message: 'User Created',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }),
];
exports.loginController = [
    auth_validator_1.validateLogin,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const result = yield (0, auth_service_1.login)(username, password);
            res.json({
                success: true,
                message: 'User Login',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }),
];
exports.refreshTokenController = [
    auth_validator_1.validateRefreshToken,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.body;
            const result = yield (0, auth_service_1.valrefreshToken)(refreshToken);
            res.json({
                success: true,
                message: 'Token berhasil diperbarui',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }),
];
exports.logoutController = [
    auth_middleware_1.authenticate,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            const result = yield (0, auth_service_1.logout)(user.id);
            res.json({
                success: true,
                message: 'Logout berhasil',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }),
];
