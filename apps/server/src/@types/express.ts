import { z } from "zod";
import "express-session";
import * as express from "express";
import { Session } from "express-session";

export const TokenPayloadSchema = z.object({
  id: z.string(),
  role: z.enum(["admin", "buyer", "seller"]),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

declare global {
  namespace Express {
    interface User extends TokenPayload {}
    interface Request {
      user?: TokenPayload;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    googleId: string;
    firstName: string;
    lastName: string;
    email: string;
    user: TokenPayload;
  }
}
