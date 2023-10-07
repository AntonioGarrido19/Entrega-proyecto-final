import { Router } from "express";
import { ObjectId } from "mongodb";
import { cartsModel } from "../db/models/carts-model.js";
import { cartsMongo } from "../DAL/managers/carts/CartsMongo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsMongo.findAll();
    if (carts.length) {
      res.status(200).json({ message: "Carts", carts });
    } else {
      res.status(200).json({ message: "No carts found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartsMongo.findById(id);
    if (!cart) {
      res.status(400).json({ message: "Invalid ID" });
    } else {
      res.status(200).json({ message: "Cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { products } = req.body;
  if (!products) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newCart = await cartsMongo.createOne(req.body);
    res.status(200).json({ message: "Cart created", cart: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteOneCart = await cartsMongo.deleteCart(id);
  res.status(200).json({ deleteOneCart });
});

router.delete("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const result = await cartsMongo.deleteProduct(idCart, idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartId = new ObjectId(cid);
  const updatedData = req.body;

  try {
    const updatedCart = await cartsMongo.updateOne(cartId, updatedData);
    res.status(200).json({ message: "Cart updated", updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to update cart" });
  }
});


router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const updatedQuantity = req.body.quantity;
  try {
      const updatedCart = await cartsMongo.updateProductQuantity(cid, pid, updatedQuantity);
      const updatedProduct = updatedCart.products.find(product => product.id._id.toString() === pid);

      res.status(200).json({
          message: "Cantidad de producto actualizada",
          cart: updatedCart,
          updatedProduct: {
              _id: updatedProduct.id._id,
              quantity: updatedProduct.quantity
              
          }
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar la cantidad del producto en el carrito" });
  }
});

export default router;
