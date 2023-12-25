import { cartsMongo } from "../DAL/managers/carts/CartsMongo.js";

class CartsService {
  async findAll() {
    const carts = await cartsMongo.findAll();
    return carts;
  }

  async create(obj) {
    const cart = await cartsMongo.createOne(obj);
    return cart;
  }

  async findById(cid) {
    const cart = await cartsMongo.findById(cid);
    return cart;
  }

  async update(cid, obj) {
    const cart = await cartsMongo.updateOne(cid, obj);
    return cart;
  }

  async deleteOne(cid) {
    const response = await cartsMongo.deleteCart(cid);
    return response;
  }

  async deleteProduct(cid, idProduct) {
    const response = await cartsMongo.deleteProduct(
      cid,
      { _id: cid },
      { $pull: { products: idProduct } }
    );
    return response;
  }

  async updateProductQuantity(cid, productId, updatedQuantity) {
    const response = await cartsMongo.updateProductQuantity(
      cid,
      productId,
      updatedQuantity
    );
    return response;
  }
}

export const cartsService = new CartsService();
