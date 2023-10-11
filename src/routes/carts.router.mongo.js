import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartsController.getCarts);

router.post("/", cartsController.createCart);

router.get("/:id", cartsController.getCartById);

router.delete("/:id", cartsController.deleteCart);

router.delete(
  "/:idCart/products/:idProduct",
  cartsController.deleteCartProduct
);

router.put("/:cid", cartsController.updateCart);

router.put("/:cid/products/:pid", cartsController.updateProductQuantity);

export default router;
