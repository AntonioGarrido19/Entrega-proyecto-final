import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.mongo.js";
import { Server } from "socket.io";
import "./db/dbConfig.js";

// import productsRouter from "./routes/products.router.js";
// import cartsRouter from "./routes/carts.router.js";

import { productsMongo } from "./dao/managers/products/ProductsMongo.js";
import {fetchedProducts} from "./routes/products.router.mongo.js";

import { messagesMongo } from "./dao/managers/messages/MessagesMongo.js";
import { fetchedMessages } from "./routes/messages.router.mongo.js";

import { cartsMongo } from "./dao/managers/carts/CartsMongo.js";
import { fetchedCarts } from "./routes/carts.router.mongo.js";


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
app.use("/", productsRouter);
app.use("/api/views", viewsRouter);


const httpServer = app.listen(PORT, () => {
  console.log("servidor creado");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("cliente conectado");
  socket.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  socketServer.emit("products", fetchedProducts);

  socket.on("newProduct", async (newProduct) => {
    socketServer.emit("added", newProduct);
    const product = await productsMongo.createOne(newProduct);
    console.log(product);
    return product;
  });

  socket.on("deleteProduct", async (idProductDelete) => {
    const deletedProduct = await productsMongo.deleteOne(idProductDelete);
    console.log(deletedProduct);
    socketServer.emit("deleted", idProductDelete);
    return deletedProduct;
  });

  socketServer.emit("messages", fetchedMessages);

  socket.on("newMessage", async (messageInfo) => {
    socketServer.emit('new', messageInfo)
    const message = await messagesMongo.createOne(messageInfo)
    console.log(message);
    return message;
  });

  //CARTS
  socketServer.emit('carts', fetchedCarts);

});
