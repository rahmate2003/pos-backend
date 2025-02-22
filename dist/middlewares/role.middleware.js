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
exports.checkRole = void 0;
const client_1 = require("@prisma/client");
const auth_middleware_1 = require("./auth.middleware");
const prisma = new client_1.PrismaClient();
const checkRole = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Ensure the user is authenticated
            (0, auth_middleware_1.authenticate)(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
                const user = req.user;
                // Find the user's role in the StoreUser table
                const storeUser = yield prisma.storeUser.findFirst({
                    where: {
                        userId: user.id,
                    },
                    include: {
                        Role: true,
                    },
                });
                if (!storeUser) {
                    return res.status(403).json({
                        success: false,
                        message: 'User does not have a role in any store',
                    });
                }
                // Check if the user has the required role
                if (storeUser.Role.name !== requiredRole) {
                    return res.status(403).json({
                        success: false,
                        message: `User does not have the required role`,
                    });
                }
                // If the user has the required role, proceed to the next middleware
                next();
            }));
        }
        catch (error) {
            next(error);
        }
    });
};
exports.checkRole = checkRole;
