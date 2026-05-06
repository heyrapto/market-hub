import { Router } from "express";
import {
  cancelOrder,
  getOrderDetails,
  getOrderStatus,
  placeOrder,
} from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middlware";

const router = Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/details/:orderId", authMiddleware, getOrderDetails);
router.get("/status/:orderId", authMiddleware, getOrderStatus);
router.put("/cancel/:orderId", authMiddleware, cancelOrder);

export default router;
