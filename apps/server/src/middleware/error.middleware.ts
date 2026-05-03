import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { env } from "../config/env";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  console.error({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    message: err.message,
    // stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  res.status(statusCode).json({
    status: "error",
    message: err.message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
