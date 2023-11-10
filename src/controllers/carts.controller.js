import { cartsService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";
import { ObjectId } from "mongodb";
import CustomError from "../errors/CustomError.js";
import { ErrorMessage, ErrorName } from "../errors/error.enum.js";
import { productsMongo } from "../DAL/managers/products/ProductsMongo.js";
import { productsModel } from "../DAL/mongoDB/models/products-model.js";
import { logger } from "../winston.js";

class CartsController {
  async getCarts(req, res) {
    try {
      const carts = await cartsService.findAll();
      console.log("Carts from the database:", carts);
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
      throw new CustomError(ErrorMessage.CART_MISSING_DATA);
    }
    try {
      const newCart = await cartsService.create(req.body);
      res.status(200).json({ message: "Cart created", cart: newCart });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  //REVISAR
  async getCartById(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartsService.findById(cid);
      if (!cart) {
        throw new CustomError(ErrorMessage.CART_NOT_FOUND);
      } else {
        res.status(200).json({ message: "Cart found", cart });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteCart(req, res) {
    const { cid } = req.params;
    const deleteOneCart = await cartsService.deleteOne(cid);
    if (!deleteOneCart) {
      throw new CustomError(ErrorMessage.CART_NOT_FOUND);
    } else {
      res.status(200).json({ message: "Cart Deleted", deleteOneCart });
    }
  }

  async deleteCartProduct(req, res) {
    const { cid, idProduct } = req.params;
    try {
      const result = await cartsService.deleteProduct(cid, idProduct);
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
      res.status(500).json({
        error: "Error al actualizar la cantidad del producto en el carrito",
      });
    }
  }

  async getCartAndProducts(req, res) {
    const { cid } = req.params;

    try {
      const cart = await cartsService.findById(cid);

      if (!cart) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const products = await productsService.findAll({
        limit: 100,
        page: 1,
        sort: "asc",
      });

      const purchase = cart.products.map((cartProduct) => {
        const productInProducts = products.info.payload.find(
          (prod) => prod._id.toString() === cartProduct.id._id.toString()
        );

        console.log(productInProducts);

        if (productInProducts) {
          if (productInProducts.stock >= cartProduct.quantity) {
            return {
              title: productInProducts.title,
              stock: productInProducts.stock,
              id: productInProducts._id,
              quantity: cartProduct.quantity,
            };
          } else {
            return {
              title: productInProducts.title,
              stock: productInProducts.stock,
              id: productInProducts._id,
              quantity: cartProduct.quantity,
              message: "Insufficient stock for the requested quantity", 
            };
          }
        } else {
          return {
            title: cartProduct.id.title,
            stock: 0,
            id: cartProduct.id,
            quantity: cartProduct.quantity,
            message: "Product not found in the database", 
          };
        }
      });


      return res.status(200).json({ purchase });
    } catch (error) {
      console.error("Error:", error); 
      return res.status(500).json({ message: "An error occurred" });
    }
  }

}

export const cartsController = new CartsController();
