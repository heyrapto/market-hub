import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteMultipleProducts,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

// create a product
router.post("/create", createProduct);
// get all products
router.post("/", getAllProducts);
// get a product by id
router.post("/:id", getProductById);
// update a product
router.post("/update/:id", updateProduct);
// delete a product
router.post("/delete/:id", deleteProduct);
// delete multiple products
router.post("/delete/multiple", deleteMultipleProducts);

export default router;
