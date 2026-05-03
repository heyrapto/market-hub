import * as z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(9000),
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(["production", "development", "test"])
    .default("development"),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(4000),
});

export const env = envSchema.parse(process.env);
