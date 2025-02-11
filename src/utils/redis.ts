// utils/redis.ts
import { createClient, RedisClientType } from "redis";
import config from '../config/config';

const redisClient: RedisClientType = createClient({
  url: config.redis.url,
  socket: {
  reconnectStrategy: (retries: number) => {
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

redisClient.on("error", (err: Error) => {
  console.error("Redis connection error:", err.message);
});

// Attempt to connect, stop execution if connection fails
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Unable to connect to Redis. Please ensure Redis is running.");
  }
})();

export default redisClient;
