import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteMultipleProducts,
  deleteProduct,
} from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";
import { authMiddleware } from "../middleware/auth.middlware";

const router = Router();

// create a product
router.post(
  "/create",
  upload.single("imageFile"),
  authMiddleware,
  createProduct,
);
// get all products
router.post("/", getAllProducts);
// get a product by id
router.post("/:id", getProductById);
// update a product
router.post(
  "/update/:id",
  upload.single("imageFile"),
  authMiddleware,
  updateProduct,
);
// delete a product
router.post("/delete/:id", authMiddleware, deleteProduct);
// delete multiple products
router.post("/delete/multiple", authMiddleware, deleteMultipleProducts);

export default router;
