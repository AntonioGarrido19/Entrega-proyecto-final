import { productsService } from "../services/products.service.js";
import CustomError from "../errors/CustomError.js";
import { ErrorMessage, ErrorName } from "../errors/error.enum.js";

class ProductsController {
  async getProducts(req, res) {
    try {
      const products = await productsService.findAll({limit: 10, page: 1, sort: 'asc'});
      //const payloadArray = products.info.payload
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async createProduct(req, res) {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      //throw new CustomError(ErrorMessage.PRODUCT_MISSING_DATA);
      //return res.status(400).json({ error: "Product data is incomplete" });

    }
    try {
      const newProduct = await productsService.create(req.body);
      res.status(200).json({ message: "Product created", product: newProduct });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsService.findById(pid);
      if (!product) {
        //throw new CustomError(ErrorMessage.PRODUCT_NOT_FOUND);
        return res.status(404).json({ error: "Product not found" });

      } else {
        res.status(200).json({ message: "Product found", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    const updatedProductData = req.body;
    console.log(updatedProductData);
    try {
      const product = await productsService.update(pid, updatedProductData);
      if (!product) {
       // throw new CustomError(ErrorMessage.PRODUCT_NOT_FOUND);
       return res.status(404).json({ error: "Product not found" });

      } else {
        res.status(200).json({ message: "Product found", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteProduct(req, res) {
    const { pid } = req.params;
    try {
      const product = await productsService.deleteOne(pid);
      if (!product) {
       // throw new CustomError(ErrorMessage.PRODUCT_NOT_FOUND);
       return res.status(404).json({ error: "Product not found" });

      } else {
        res.status(200).json({ message: "Product Deleted", product });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export const productsController = new ProductsController();