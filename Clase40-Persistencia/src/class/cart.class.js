class Cart {
  constructor(user, products) {
    this._user = user;
    this._products = products;
  }

  getUser() {
    return this._user;
  }

  setUser(user) {
    this._user = user;
  }

  getProducts() {
    return this._products;
  }

  setProducts(products) {
    this._products = products;
  }
}

export default Cart;
