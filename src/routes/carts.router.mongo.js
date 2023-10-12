import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();

//no funcionan
router.get("/", cartsController.getCarts);


//funcionan
router.post("/", cartsController.createCart);

router.get("/:cid", cartsController.getCartById);

router.delete("/:cid", cartsController.deleteCart);

router.delete(
  "/:idCart/products/:idProduct",
  cartsController.deleteCartProduct
);

router.put("/:cid", cartsController.updateCart);

//Sin probar
router.put("/:cid/products/:pid", cartsController.updateProductQuantity);

export default router;
