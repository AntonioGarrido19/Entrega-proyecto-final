import { productsMongo } from "../DAL/managers/products/ProductsMongo.js";

class ProductsService {
  async findAll(obj) {
    const products = await productsMongo.findAll(obj);
    //console.log(products);
    return products;
  }

  async create(obj) {
    const product = await productsMongo.createOne(obj);
    return product;
  }

  async findById(pid) {
    const product = await productsMongo.findById(pid);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async update(pid, updatedData) {
    const product = await productsMongo.updateOne(pid, updatedData);
    return product;
  }

  async deleteOne(pid) {
    const response = await productsMongo.deleteOne(pid);
    return response;
  }
}

export const productsService = new ProductsService();
