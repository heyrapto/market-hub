import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(9000),
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(["production", "development", "test"])
    .default("development"),
  JWT_SECRET: z.coerce.string().min(10),
  JWT_REFRESH_SECRET: z.coerce.string().min(40),
});

export const env = envSchema.parse(process.env);
