import { Redis } from "ioredis";
import { env } from "./env";

export const redis = new Redis(env.REDIS_URL, {
  keepAlive: 30000,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err: any) => {
  console.error("Redis error:", err);
});
