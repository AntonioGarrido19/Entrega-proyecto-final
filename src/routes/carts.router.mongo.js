import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { productsController } from "../controllers/products.controller.js";
import { productsService } from "../services/products.service.js"
import { ticketService } from "../services/tickets.service.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", cartsController.getCarts);

router.post(
  "/",
  jwtValidation,
  authMiddleware("user"),
  cartsController.createCart
);

router.get("/purchase/:cid", 
cartsController.getCartAndProducts
)


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
