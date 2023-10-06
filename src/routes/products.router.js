import { Router } from "express";
import productManager from "../DAL/managers/products/ProductManager.js";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:pid", getProductById);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
