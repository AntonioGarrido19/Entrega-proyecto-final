import { cartsService } from "../services/carts.service.js";

class CartsController {
  async getCarts(req, res) {
    try {
      const carts = await cartsService.findAll();
      if (carts.length) {
        res.status(200).json({ message: "Carts", carts });
      } else {
        res.status(200).json({ message: "No carts found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async createCart(req, res) {
    const { products } = req.body;
    if (!products) {
      return res.status(400).json({ message: "Some data is missing" });
    }
    try {
      const newCart = await cartsService.create(req.body);
      res.status(200).json({ message: "Cart created", cart: newCart });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getCartById(req, res) {
    const { id } = req.params;
    try {
      const cart = await cartsService.findById(id);
      if (!cart) {
        res.status(400).json({ message: "Invalid ID" });
      } else {
        res.status(200).json({ message: "Cart found", cart });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteCart(req, res) {
    const { id } = req.params;
    const deleteOneCart = await cartsService.deleteOne(id);
    res.status(200).json({ deleteOneCart });
  }

  async deleteCartProduct(req, res) {
    const { idCart, idProduct } = req.params;
    try {
      const result = await cartsService.deleteProduct(idCart, idProduct);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateCart(req, res) {
    const { cid } = req.params;
    const cartId = new ObjectId(cid);
    const updatedData = req.body;

    try {
      const updatedCart = await cartsService.update(cartId, updatedData);
      res.status(200).json({ message: "Cart updated", updatedCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error to update cart" });
    }
  }


  async updateProductQuantity(req, res) {
    const { cid, pid } = req.params;
    const updatedQuantity = req.body.quantity;
    try {
      const updatedCart = await cartsService.updateProductQuantity(
        cid,
        pid,
        updatedQuantity
      );
      const updatedProduct = updatedCart.products.find(
        (product) => product.id._id.toString() === pid
      );

      res.status(200).json({
        message: "Cantidad de producto actualizada",
        cart: updatedCart,
        updatedProduct: {
          _id: updatedProduct.id._id,
          quantity: updatedProduct.quantity,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          error: "Error al actualizar la cantidad del producto en el carrito",
        });
    }
  }
}

export const cartsController = new CartsController();
