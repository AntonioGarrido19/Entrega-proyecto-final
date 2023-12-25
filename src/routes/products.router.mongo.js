import { Router } from "express";
import {productsController} from "../controllers/products.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const router = Router();

router.get("/", productsController.getProducts);

router.post("/", jwtValidation,authMiddleware('admin'), productsController.createProduct);

router.get("/:pid", productsController.getProductById);

router.put("/:pid", jwtValidation,authMiddleware('admin'),productsController.updateProduct);

router.delete("/:pid", jwtValidation,authMiddleware('admin'), productsController.deleteProduct);

export default router;
