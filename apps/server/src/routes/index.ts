import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./product.route";
import reviewRoutes from "./reviews.route";
import orderRoutes from "./order.route";
import cartRoutes from "./cart.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/review", reviewRoutes);
router.use("/order", orderRoutes);
router.use("/cart", cartRoutes);

export default router;
