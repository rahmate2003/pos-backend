"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/admin.routes.ts
const express_1 = __importDefault(require("express"));
const role_middleware_1 = require("../middlewares/role.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Hanya admin yang bisa mengakses route ini
router.get('/iya', auth_middleware_1.authenticate, (0, role_middleware_1.checkRole)('SuperAdmin'), (req, res) => {
    res.json({
        success: true,
        message: 'Welcome, Admin!',
    });
});
exports.default = router;
