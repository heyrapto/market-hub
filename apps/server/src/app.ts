import express from "express";
import AppRoutes from "./routes/index";

const app = express();

app.use(express.json());

app.use("/api/v1/", AppRoutes);

export default app;
