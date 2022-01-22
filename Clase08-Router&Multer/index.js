const express = require("express");
const products = require("./routes/products");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", products);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(" Server run on port " + PORT);
});
