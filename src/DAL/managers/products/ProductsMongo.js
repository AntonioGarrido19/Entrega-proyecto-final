import { productsModel } from "../../mongoDB/models/products-model.js";

class ProductsMongo {


  async findAll(obj) {
    const { limit = 10, page, sort, ...query } = obj;
    try {
      const result = await productsModel.paginate(query, {
        limit,
        page,
        sort: { price: sort },
      });
      //console.log("Page:", page);
      const info = {
        count: result.totalDocs,
        payload: result.docs,
        totalPages: result.totalPages,
        page: result.page,
        hasPrevPage: result.hasPrevPage ? result.prevPage : null,
        hasNextPage: result.hasNextPage ? result.nextPage : null,
        nextLink: result.hasNextPage
          ? `http://localhost:8080/api/products?page=${result.nextPage}`
          : null,
        prevLink: result.hasPrevPage
          ? `http://localhost:8080/api/products?page=${result.prevPage}`
          : null,
      };
      //console.log(info);
      return { info };
    } catch (error) {
    return (error)
      };
  }

  async createOne(obj) {
    try {
      const newProduct = await productsModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async findById(pid) {
    try {
      const product = await productsModel.findById(pid);
      return product;
    } catch (error) {
      return error;
    }
  }


  async updateOne(pid, updatedData) {
    console.log("pid:", pid);
    //console.log("updatedData:", updatedData);
    try {
      const response = await productsModel.updateOne(
        { _id: pid },
        { $set: updatedData }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(pid) {
    try {
      const response = await productsModel.findByIdAndDelete(pid);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const productsMongo = new ProductsMongo();
