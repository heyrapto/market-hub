import { Router } from "express";
import {
  reviewProduct,
  getProductReviews,
} from "../controllers/reviews.controller";

const router = Router();

router.post("/", reviewProduct);
router.post("/:productId", getProductReviews);

export default router;
