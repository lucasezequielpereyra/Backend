import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import path from "path";
import logger from "./config/winston";
import authRoutes from "./routes/auth.route";

const app = express();

/*    MIDDLEWARES   */
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

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
import "./config/passport";
app.use(passport.initialize());
app.use(passport.session());

/*    Statics end points    */
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});

/*    Routes    */
app.use("/auth", authRoutes);

/*    404 not found route     */
app.get("*", (req, res) => {
  logger.warn.warn(`${req.method} ${req.url} url not found`);
  res.send("404");
});

export default app;
