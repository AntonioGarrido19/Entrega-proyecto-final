import { cartsMongo } from "../DAL/managers/carts/CartsMongo.js";

class CartsService {
  async findAll() {
    const carts = cartsMongo.findAll();
    return carts;
  }

  async create() {
    const cart = cartsMongo.createOne(obj);
    return cart;
  }

  async findById(id) {
    const cart = await cartsMongo.findById(id);
    return cart;
  }

  async update(id, obj) {
    const cart = await cartsMongo.updateOne({ _id: id }, { ...obj });
    return cart;
  }

  async deleteOne(id) {
    const response = await cartsMongo.deleteCart(id);
    return response;
  }

  async deleteProduct(idCart, idProduct) {
    const response = await cartsMongo.deleteProduct(
      idCart,
      { _id: idCart },
      { $pull: { products: idProduct } }
    );
    return response;
  }

  async updateProductQuantity(cartId, productId, updatedQuantity) {
    const response = await cartsMongo.updateProductQuantity(
      cartId,
      productId,
      updatedQuantity
    );
    return response;
  }
}

export const cartsService = new CartsService();
