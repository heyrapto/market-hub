import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { env } from "../config/env";
import { TokenPayloadSchema } from "../@types/express";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    // decode the payload(user id, role) if token is valid and attach it to express Request
    const result = TokenPayloadSchema.safeParse(decoded);
    req.user = result.data;

    next();
  } catch (error) {
    throw new AppError("Expired or invalid", 403);
  }
};
