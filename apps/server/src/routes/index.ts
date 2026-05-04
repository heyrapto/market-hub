import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./product.route";
import reviewRoutes from "./reviews.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/review", reviewRoutes);

export default router;
