import fs from "fs";

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
        if (fs.existsSync(this.path)) {
            const carts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(carts);
          } else {
            return [];
          }
    } catch (error) {
        return error;
    }
  }

  async getOneCart(id) {
    try {
        const carts = await this.getAllCarts();
        const cart = carts.find((c) => c.id === id);
        return cart;
    } catch (error) {
        return error
    }
  }

  async createCart() {
    try {
        const carts = await this.getAllCarts();
        let id;
        if (!carts.length) {
          id = 1;
        } else {
          id = carts[carts.length - 1].id + 1;
        }
        const newCart = { products: [], id };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return newCart;
    } catch (error) {
        return error
    }
  }


  async addProduct(cartId, pid){
    try {
        const carts = await this.getAllCarts()
        const cart = carts.find(c=>c.id===cartId)
        const productIndex = cart.products.findIndex(p=>p.product===pid)
        if ( productIndex === -1){
            cart.products.push({product:pid, quantity:1})
        }else {
            cart.products[productIndex].quantity++
        }
        await fs.promises.writeFile(this.path,JSON.stringify(carts))
        return cart
    } catch (error) {
        return error
    }
  }
}

export const cartManager = new CartsManager("Carts.json");

