// Helpers
const getData = require('../Helpers/getData');
const isIn = require('../Helpers/isIn');
const writeData = require('../Helpers/writeData');

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(element) {
    const data = await getData(this.file);

    if (!data) {
      const arrayItems = [element];
      await writeData(this.file, JSON.stringify(arrayItems, null, 2));
      return `El producto ${element.name}, fue agregado con exito y su id es ${element.id}`;
    }
    const arrayItems = [...data, element];
    await writeData(this.file, JSON.stringify(arrayItems, null, 2));

    return `El producto ${element.name}, fue agregado con exito y su id es ${element.id} `;
  }

  async getAll() {
    const data = await getData(this.file);
    return data;
  }

  async getById(id) {
    const data = await this.getAll();
    if (isIn(id, data)) {
      const elementFound = data.find(element => element.id == id);
      console.log(elementFound);
      return elementFound;
    }
    return 'Producto no encontrado';
  }

  async deleteById(id) {
    const data = await this.getAll();
    if (isIn(id, data)) {
      const elementsFiltered = data.filter(element => element.id != id);
      await writeData(this.file, JSON.stringify(elementsFiltered, null, 2));
      return `El producto ${id} fue eliminado correctamente`;
    }

    return `El producto ${id} no fue encontrado en el archivo`;
  }

  async editById(id, newProps) {
    const data = await this.getAll();

    if (isIn(id, data)) {
      const index = data.findIndex(element => element.id == id);
      data[index] = {
        ...newProps,
        id: data[index].id,
      };
      await writeData(this.file, JSON.stringify(data, null, 2));
      return `El producto ${id} se actualizo correctamente`;
    }
    return `El producto ${id} no fue encontrado`;
  }
}

module.exports = Container;
