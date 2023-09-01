import { cartsModel } from "../../../db/models/carts-model.js";
import { productMongo } from "../products/ProductsMongo.js";

class CartsMongo {
  async findAll() {
    try {
      const carts = await cartsModel.find({}).populate("products").lean();
      return carts;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const cart = await cartsModel.create(obj);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      const cart = await cartsModel.findById(id).populate("products");
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateOne(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) throw new Error("Cart not found");
      const product = await productMongo.findById(pid);
      if (!product) throw new Error("Product not found");
      const products = cart.products;

      return response;
    } catch (error) {
      return error;
    }
  }

  async updateQuantity(idCart, idProduct, quant) {
    try {
      const { quantity } = quant;
      const cart = await cartsModel.findById(idCart);
      const prodInCart = cart.products;
      const newQuantity = prodInCart.find((e) => e.id == idProduct);
      newQuantity.quantity = quantity;
      return response;
    } catch (error) {
      return error;
    }
  }

    async deleteCart(id) {
      try {
        const response = await cartsModel.findByIdAndDelete(id);
        return response;
      } catch (error) {
        return error;
      }
    }


  async deleteProduct(idCart, idProduct) {
    try {
      const cart = await cartsModel.findById(idCart);
      if (!cart) throw new Error("Cart not found");

      const response = await cartsModel.updateOne(
        { _id: idCart },
        { $pull: { products: idProduct } }
      );

      return response;
    } catch (error) {
      return error;
    }
  }
}

export const cartsMongo = new CartsMongo();
