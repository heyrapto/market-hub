import { z } from "zod";
import * as express from "express";

// Define what your JWT payload looks like
export const TokenPayloadSchema = z.object({
  id: z.string(),
  role: z.enum(["admin", "buyer", "seller"]),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

// Tell Express about the new property
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
