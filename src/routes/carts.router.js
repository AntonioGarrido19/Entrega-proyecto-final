import { Router } from "express";
import { cartManager } from "../dao/managers/carts/CartsManager.js";

const router = Router();

router.get("/", async (request, response) => {
  try {
    const carts = await cartManager.getAllCarts();
    response.status(200).json({ message: "Carts", carts });
  } catch (error) {
    response.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartManager.getOneCart(+id);
    res.status(200).json({ message: "Cart", cart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const createCart = await cartManager.createCart();
    res.status(200).json({ message: "Cart", cart: createCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/:cartId/products/:pid", async (req, res) => {
  const { cartId, pid } = req.params;
  try {
    const addProduct = await cartManager.addProduct(+cartId, +pid);
    res.status(200).json({ message: "Cart-Product", cart: addProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
