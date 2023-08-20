import fs from "fs";
import { __dirname } from "../../../utils.js";

const path = __dirname + "/Products.json";

class ProductsFile {
  async findAll() {
    try {
      if (fs.existsSync(path)) {
        const products = await fs.promises.readFile(path, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const products = await this.findAll();
      const id = products.length ? products(products.length - 1).id + 1 : 1;
      products.push({ ...obj, id });
      await fs.promises.writeFile(path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }
}
