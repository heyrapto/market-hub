import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { env } from "../config/env";
import { TokenPayloadSchema } from "../@types/express";
import express from "express";

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.headers.authorization?.split("")[1];
  if (!token || token.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const result = TokenPayloadSchema.safeParse(decoded);
    req.user = result.data;

    next();
  } catch (error) {
    res.status(403).json({ message: "Expired or invalid" });
    throw new AppError("Expired or invalid", 403);
  }
};

export const authorizeAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    throw new AppError("Unauthorized", 401);
  }

  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Not allowed to access this route" });
    throw new AppError("Unauthorized", 403);
  }

  next();
};
