import rateLimit from "express-rate-limit";
import { AppError } from "../utils/appError";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,

  handler: (req, res, next) => {
    next(new AppError("Too many requests, please try again later.", 429));
  },
});
