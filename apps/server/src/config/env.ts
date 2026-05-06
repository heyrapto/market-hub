import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(9000),
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(["production", "development", "test"])
    .default("development"),
  JWT_ACCESS_SECRET: z.coerce.string().min(10),
  JWT_REFRESH_SECRET: z.coerce.string().min(40),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  CALLBACK_URL: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string(),
  REDIS_URL: z.string().default("redis://localhost:6379"),
});

export const env = envSchema.parse(process.env);
