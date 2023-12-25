import { cartsModel } from "../../mongoDB/models/carts-model.js";

class CartsMongo {

  async findAll() {
    try {
      const carts = await cartsModel.find({}).populate("products.id")
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
      const cart = await cartsModel.findById(id).populate("products.id");
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const update = await cartsModel.updateOne({ _id: id }, { ...obj });
      return update;
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

  async updateProductQuantity(cartId, productId, updatedQuantity) {
    try {
        const cart = await cartsModel.findById(cartId).populate("products.id");

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productToUpdate = cart.products.find(product => product.id._id.toString() === productId);

        if (!productToUpdate) {
            throw new Error("Producto no encontrado en el carrito");
        }

        productToUpdate.quantity = updatedQuantity;
        await cart.save();

        return cart;
    } catch (error) {
        throw error;
    }
}


}

export const cartsMongo = new CartsMongo();
