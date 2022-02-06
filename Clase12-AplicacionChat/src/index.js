const express = require("express");
const app = express();
const router = require("./routes/products");
const handlebars = require("express-handlebars");
const path = require("path");
const Container = require("../Class/Container");

// Paths
const rouetView = path.join(__dirname, "../views");
const routeLayout = path.join(__dirname, "../views/layouts");
const routePublic = path.join(__dirname, "../public");
const configFile = path.join(__dirname, "../DB/products.json");
const configFileMsg = path.join(__dirname, "../DB/messages.json");

// Container Instance
const container = new Container(configFile);
const containerMsg = new Container(configFileMsg);

// Server
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 8080;

// MdW
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HBS
app.set("views", rouetView);
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    layoutsDir: routeLayout,
    defaultLayout: "main",
  })
);

// Socket
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(routePublic));

// Socket Config
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  // First List Check
  const data = await container.getAll();
  socket.emit("firstUpdate", data);
  const dataMsg = await containerMsg.getAll();
  socket.emit("firstUpdateMsg", dataMsg);

  // Add Product
  socket.on("newProduct", async (data) => {
    await container.save(data);

    const allPrd = await container.getAll();
    io.sockets.emit("updateOk", allPrd); // Update table products
  });

  // Add Msg
  socket.on("newMsg", async (data) => {
    await containerMsg.saveMsg(data);

    const allMsg = await containerMsg.getAll();
    io.sockets.emit("updateMsgOk", allMsg);
  });
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/products", router);

server.listen(port, () => {
  console.log("Server running on " + port);
});
