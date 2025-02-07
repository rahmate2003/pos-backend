"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)('dev')); // Logging
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)({
    origin: ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || '*', // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Body parser
app.use(express_1.default.json());
// Routes
app.use('/api/v1', routes_1.default);
// 404 Not Found Handler
app.use(notFound_middleware_1.notFoundHandler);
// Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
