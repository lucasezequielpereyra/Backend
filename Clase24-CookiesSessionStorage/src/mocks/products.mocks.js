import generateProducts from '../utils/generateProducts';

class ProductsMock {
  constructor() {
    this.elements = [];
  }

  listAll() {
    return [...this.elements];
  }

  popular(cant = 5) {
    let populateList = [];

    for (let i = 0; i < cant; i++) {
      let newProduct = generateProducts();

      populateList.push(newProduct);
    }
    this.elements = populateList;
    return populateList;
  }
}

export default ProductsMock;
