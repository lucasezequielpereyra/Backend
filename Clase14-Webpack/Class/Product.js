const { v4: uuidv4 } = require('uuid');
let now = new Date();

class Product {
  id;
  timestamp;
  name;
  description;
  code;
  url;
  price;
  stock;

  constructor(name, description, code, url, price, stock) {
    this.id = uuidv4();
    this.timestamp = now.toLocaleString();
    this.name = name;
    this.description = description;
    this.code = code;
    this.url = url;
    this.price = price;
    this.stock = stock;
  }
}

module.exports = Product;
