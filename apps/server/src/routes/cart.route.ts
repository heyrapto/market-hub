import { Router } from "express";
import {
  addToCart,
  checkoutCart,
  getCart,
  updateCart,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/auth.middlware";

const router = Router();

router.post("/add", authMiddleware, addToCart);
router.post("/", authMiddleware, getCart);
router.post("/update", authMiddleware, updateCart);
router.post("/checkout", authMiddleware, checkoutCart);

export default router;
