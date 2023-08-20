import { cartsModel } from "../../models/carts-model.js";

class CartsMongo {
  async findAll() {
    try {
      const carts = await cartsModel.find({});
      return carts;
    } catch (error) {
      return error;
    }
  }

  async createOne() {
    try {
      const carts = await cartsModel.create(obj);
      return carts;
    } catch (error) {
      return error;
    }
  }

  async findById() {
    try {
      const carts = await cartsModel.findById(id);
      return carts;
    } catch (error) {
      return error;
    }
  }

  async updateOne() {
    try {
      const response = await cartsModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteOne() {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const cartsMongo = new CartsMongo()