import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import "./db/dbConfig.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from 'passport'
import './passport/passportStrategies.js'

import productsRouter from "./routes/products.router.mongo.js";
import cartsRouter from "./routes/carts.router.mongo.js";
import messagesRouter from "./routes/messages.router.mongo.js";
import usersRouter from "./routes/users.router.js";
import loginRouter from "./routes/login.router.js";
// import loginRouter from "./routes/session.router.js"

import { productsMongo } from "./dao/managers/products/ProductsMongo.js";
import { messagesMongo } from "./dao/managers/messages/MessagesMongo.js";
import { cartsMongo } from "./dao/managers/carts/CartsMongo.js";

const PORT = 8080;
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//cookies
app.use(cookieParser("secretKeyCookies"));


//sessions
session;
app.use(
  session({
    store: new mongoStore({
      mongoUrl:
        "mongodb+srv://antogarrido98:Puntarubia2023@coderhousecluster.1xhgeyw.mongodb.net/ecommerce?retryWrites=true&w=majority",
    }),
    secret: "secretSession",
    cookie: { maxAge: 60000 },
  })
);

//passport
app.use(passport.initialize())
app.use(passport.session())


//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", messagesRouter);
app.use("/api/views", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);


const httpServer = app.listen(PORT, () => {
  console.log("servidor creado");
});




const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("cliente conectado");
  socket.on("disconnect", () => {
    console.log("cliente desconectado");
  });

  socket.on("getProducts", async () => {
    try {
      const products = await productsMongo.findAll({});
      socket.emit("products", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  });

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

  socket.on("getMessages", async () => {
    try {
      const messages = await messagesMongo.findAll({});
      //console.log(messages);
      socket.emit("messages", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  socket.on("newMessage", async (messageInfo) => {
    socketServer.emit("new", messageInfo);
    const message = await messagesMongo.createOne(messageInfo);
    console.log(message);
    return message;
  });

  //CARTS

  socket.on("getCarts", async () => {
    try {
      const carts = await cartsMongo.findAll({});
      socket.emit("carts", carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  });
});
