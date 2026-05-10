import express from "express";
import AppRoutes from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import { apiLimiter } from "./middleware/rate-limit.middleware";
import passport from "passport";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(apiLimiter);

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use("/api/v1/", cors(corsOptions), AppRoutes);

app.use(errorHandler);

export default app;
