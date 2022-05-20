import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import path from "path";
import logger from "./config/winston";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import productModel from "./models/product.model";

const app = express();

/*    MIDDLEWARES   */
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

/*    TEMPLATE ENGINE     */
const viewPath = path.join(__dirname, "../views");
app.set("view engine", "ejs");
app.set("views", viewPath);

/*    SESSION     */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_CONNECT,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
/*    PASSPORT     */
import "./config/passport";
app.use(passport.initialize());
app.use(passport.session());

/*    Statics end points    */
app.get("/", (req, res) => {
  req.session?.user ? res.redirect("/dash") : res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/dash", async (req, res) => {
  const products = await productModel.find(); // products for dashboard
  const cart = req.session?.cart;

  req.session?.user
    ? res.render("dash-products", {
        user: req.session.user,
        products: products,
        cart: cart,
      })
    : res.redirect("/");
});

/*    Routes    */
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

/*    404 not found route     */
app.get("*", (req, res) => {
  logger.warn.warn(`${req.method} ${req.url} url not found`);
  res.send("404");
});

export default app;
