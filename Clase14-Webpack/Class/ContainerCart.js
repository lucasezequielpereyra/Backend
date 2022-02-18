// Helpers
const getData = require('../Helpers/getData');
const isIn = require('../Helpers/isIn');
const writeData = require('../Helpers/writeData');

class Container {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    const data = await getData(this.file);
    return data;
  }

  async save(element) {
    const data = await getData(this.file);

    if (!data) {
      const arrayItems = [element];
      await writeData(this.file, JSON.stringify(arrayItems, null, 2));
      return `El carrito fue agregado con exito y su id es ${element.id}`;
    }
    const arrayItems = [...data, element];
    await writeData(this.file, JSON.stringify(arrayItems, null, 2));

    return `El carrito fue agregado con exito y su id es ${element.id} `;
  }

  async deleteById(id) {
    const data = await this.getAll();
    if (isIn(id, data)) {
      const elementsFiltered = data.filter(prd => prd.id != id);
      await writeData(this.file, JSON.stringify(elementsFiltered, null, 2));
      return `El carrito ${id} fue eliminado correctamente`;
    }

    return `El carrito ${id} no fue encontrado en el archivo`;
  }

  async getAllProducts(id) {
    const data = await this.getAll();
    if (isIn(id, data)) {
      const elementFound = data.find(element => element.id == id);
      return elementFound.products;
    }
    return 'Carrito no encontrado';
  }

  async addProductCart(id, product) {
    const data = await this.getAll();

    if (isIn(id, data)) {
      const index = data.findIndex(element => element.id == id);
      const arrayPrd = [...data[index].products, product];
      data[index] = {
        ...data[index],
        products: arrayPrd,
      };
      await writeData(this.file, JSON.stringify(data, null, 2));
      return `El carrito ${id} se actualizo correctamente`;
    }
    return `El carrito ${id} no fue encontrado`;
  }

  async deleteProductByCart(idCart, idProduct) {
    const data = await this.getAll();
    console.log(idCart);

    if (isIn(idCart, data)) {
      const index = data.findIndex(element => element.id == idCart);
      if (isIn(idProduct, data[index].products)) {
        const elementsFiltered = data[index].products.filter(
          element => element.id != idProduct,
        );
        data[index].products = elementsFiltered;

        await writeData(this.file, JSON.stringify(data, null, 2));

        return `El producto fue eliminado correctamente del carrito ${data[index].id}`;
      } else {
        return 'El producto no fue encontrado dentro del carrito';
      }
    }
    return 'Carrito no encontrado';
  }
}

module.exports = Container;
