import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

import productManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const PORT = 8080;

//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

//methods to handlebars
app.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    console.error("Error fetching products:", error);

    res.render("error", { error });
  }
});

const httpServer = app.listen(PORT, () => {
  console.log("servidor creado");
});

const socketServer = new Server(httpServer);

const fetchedProducts = [];

let getAllProducts = async () => {
  try {
    const products = await productManager.getProducts();
    fetchedProducts.push(...products);
    return products;
  } catch (error) {
    console.error(error);
  }
};

// (async () => {
//   try {
//     const products = await getAllProducts();
  
//     //console.log(fetchedProducts);
//   } catch (error) {}
// })();

getAllProducts();

socketServer.on("connection", (socket) => {
  console.log("cliente conectado");
  socket.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  socketServer.emit("products", fetchedProducts);

  socket.on("newProduct", async (newProduct) => {
    socketServer.emit("added", newProduct);
    const product = await productManager.addProduct(newProduct);
    return product;
  });

  socket.on("deleteProduct", async (idProductDelete) => {
    const parsedId = parseInt(idProductDelete, 10)
    console.log("ID", parsedId);
    const deletedProduct = await productManager.deleteProduct(parsedId)
    console.log(deletedProduct);
    socketServer.emit("deleted", parsedId)
    return deletedProduct
  });
});
