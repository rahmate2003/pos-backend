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
// utils/redis.ts
const redis_1 = require("redis");
const config_1 = __importDefault(require("../config/config"));
const redisClient = (0, redis_1.createClient)({
    url: config_1.default.redis.url,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                console.error("Redis: Failed to connect after 5 attempts. Stopping retries.");
                return false;
            }
            console.warn(`Redis: Connection failed. Retrying (${retries})...`);
            return Math.min(retries * 500, 3000);
        },
    },
});
redisClient.on("connect", () => {
    console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err.message);
});
// Attempt to connect, stop execution if connection fails
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
    }
    catch (err) {
        console.error("Unable to connect to Redis. Please ensure Redis is running.");
    }
}))();
exports.default = redisClient;
