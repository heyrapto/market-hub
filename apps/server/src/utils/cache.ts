import { redis } from "../config/redis";

const DEFAULT_EXPIRATION = 3600; // 1 hour

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

export const setCache = async (
  key: string,
  data: any,
  expiration = DEFAULT_EXPIRATION
) => {
  await redis.set(key, JSON.stringify(data), "EX", expiration);
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};

export const deleteCachePattern = async (pattern: string) => {
  let cursor = "0";
  do {
    const [newCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
    cursor = newCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== "0");
};
