class Product {
  constructor(img, name, price, stock, description, category) {
    this._img = img;
    this._name = name;
    this._price = price;
    this._stock = stock;
    this._description = description;
    this._category = category;
  }

  getImg() {
    return this._img;
  }

  setImg(img) {
    this._img = img;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getPrice() {
    return this._price;
  }

  setPrice(price) {
    this._price = price;
  }

  getStock() {
    return this._stock;
  }

  setStock(stock) {
    this._stock = stock;
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  getCategory() {
    return this._category;
  }

  setCategory(category) {
    this._category = category;
  }
}

export default Product;
