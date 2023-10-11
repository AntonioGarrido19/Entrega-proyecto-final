import { productsMongo } from "../DAL/managers/products/ProductsMongo.js";

class ProductsService {

 async findAll (obj) {
    const products = await productsMongo.findAll(obj);
    return products;
  };

  async create (obj) {
    const product = await productsMongo.createOne(obj);
    return product;
  };

   async findById(id) {
    const product = await productsMongo.findById(id);
    if (!product){
        throw new Error('Product not found')
    }
    return product;
  };

   async update (id, updatedData) {
    const product = await productsMongo.updateOne(
      { _id: id },
      { $set: updatedData }
    );
    return product;
  };

  async deleteOne (id) {
    const response = await productsMongo.deleteOne(id);
    return response;
  };
}

export const productsService = new ProductsService();