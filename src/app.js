import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import "./db/dbConfig.js";

// import productsRouter from "./routes/products.router.js";
// import productsRouter from "./routes/products.router.mongo.js";
// import cartsRouter from "./routes/carts.router.js";
// import cartsRouter from "./routes/carts.router.mongo.js";
// import messagesRouter from "./routes/messages.router.mongo.js";

// import productManager from "./db/managers/products/ProductManager.js";
import { productsMongo } from "./db/managers/products/ProductsMongo.js";
import { messagesMongo } from "./db/managers/messages/MessagesMongo.js";

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
// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);

//methods to handlebars
app.get("/", async (req, res) => {
  try {
    const products = await productsMongo.findAll();
    //console.log(products);
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
    const products = await productsMongo.findAll();
    fetchedProducts.push(...products);
    //console.log(fetchedProducts);
    return products;
  } catch (error) {
    console.error(error);
  }
};

getAllProducts();


  //CHAT 
  const fetchedMessages = [];

  let getAllMessages= async () => {
    try {
      const messages = await messagesMongo.findAll();
      fetchedMessages.push(...messages);
      console.log(fetchedMessages);
      return messages;
    } catch (error) {
      console.error(error);
    }
  };

  getAllMessages();

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
});
