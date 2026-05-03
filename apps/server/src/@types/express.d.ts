import { z } from "zod";
import * as express from "express";

export const TokenPayloadSchema = z.object({
  id: z.string(),
  role: z.enum(["admin", "buyer", "seller"]),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
