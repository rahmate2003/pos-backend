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
exports.refreshTokenController = exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validator_1 = require("../validators/auth.validator");
const handleValidationErrors = (req, res, next) => {
    next();
};
// Register Controller
exports.registerController = [
    auth_validator_1.validateRegister,
    handleValidationErrors,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, username, password } = req.body;
            const tokens = yield (0, auth_service_1.register)(email, username, password);
            res.status(201).json({ message: 'Registrasi berhasil', tokens });
        }
        catch (error) {
            next(error);
        }
    })
];
// Login Controller
exports.loginController = [
    auth_validator_1.validateLogin,
    handleValidationErrors,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const tokens = yield (0, auth_service_1.login)(email, password);
            res.json(tokens);
        }
        catch (error) {
            next(error);
        }
    }),
];
// Refresh Token Controller
exports.refreshTokenController = [
    auth_validator_1.validateRefreshToken,
    handleValidationErrors,
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.body;
            const tokens = yield refreshToken(refreshToken);
            res.json(tokens);
        }
        catch (error) {
            next(error);
        }
    }),
];
