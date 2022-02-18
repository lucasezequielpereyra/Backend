const { v4: uuidv4 } = require('uuid');
let now = new Date();

class Cart {
  id;
  timestamp;
  products;

  constructor(products) {
    this.id = uuidv4();
    this.timestamp = now.toLocaleString();
    this.products = [];
  }
}

module.exports = Cart;
