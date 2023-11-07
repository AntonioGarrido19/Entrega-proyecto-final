import express from "express";
import cors from "cors";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import "./DAL/mongoDB/dbConfig.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import "./passport/passportStrategies.js";
import config from "./config.js";
import compression from "express-compression";
import CustomError from "./errors/CustomError.js"
import { errorMiddleware } from "./errors/error.middleware.js";
import {logger} from "./winston.js"

import productsRouter from "./routes/products.router.mongo.js";
import cartsRouter from "./routes/carts.router.mongo.js";
import messagesRouter from "./routes/messages.router.mongo.js";
import usersRouter from "./routes/users.router.js";
import loginRouter from "./routes/login.router.js";
import jwtRouter from "./routes/jwt.router.js";
import authenticationRouter from "./routes/authentication.router.js";

import { productsMongo } from "./DAL/managers/products/ProductsMongo.js";
import { messagesMongo } from "./DAL/managers/messages/MessagesMongo.js";
import { cartsMongo } from "./DAL/managers/carts/CartsMongo.js";
import { generateUser } from "./mocks.js";
import { generateProducts } from "./mocks.js";

const PORT = config.port;
const app = express();

app.use(errorMiddleware);
app.use(compression());
app.use(cors());
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
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", messagesRouter);
app.use("/api/views", viewsRouter);
app.use("/api/login", loginRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/authentication", authenticationRouter);

//Ruteo avanzado y auth
app.use("/api/users", usersRouter);


const httpServer = app.listen(PORT, () => {
  logger.info("servidor creado");
});

//Mocks
app.get("/api/usersMock", (req, res) => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const userMock = generateUser();
    users.push(userMock);
  }
  res.json(users);
});

//LoggerTest

app.get("/api/loggerTest", (req,res) => {
  logger.fatal('Fatal'),
  logger.error('Error'),
  logger.warning('Warning'),
  logger.info('Info'),
  logger.http('Http'),
  logger.debug('Debug'),
  res.send("Logger winston")
})



app.get("/api/mockingProducts", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const productsMock = generateProducts();
    products.push(productsMock);
  }
  res.json(products);
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
