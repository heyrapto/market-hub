import { Router } from "express";
import {
  reviewProduct,
  getProductReviews,
} from "../controllers/reviews.controller";
import { authMiddleware } from "../middleware/auth.middlware";

const router = Router();

router.post("/", authMiddleware, reviewProduct);
router.get("/:productId", getProductReviews);

export default router;
