const fs = require("fs");

const writeData = async (file, content) => {
  try {
    await fs.promises.writeFile(file, content);
  } catch (err) {
    console.log("Write Error", err);
  }
};

const getData = async (file) => {
  try {
    const res = await fs.promises.readFile(file);
    const data = await JSON.parse(res, null, 2);

    return data;
  } catch (err) {
    console.log("Read Error", err);
  }
};

const isIn = (id, array) => {
  return array.some((item) => item.id === id);
};

class Product {
  constructor(title, price, thumbnail) {
    (this.title = title), (this.price = price), (this.thumbnail = thumbnail);
  }
}

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(product) {
    const data = await getData(this.file);

    if (!data) {
      const arrayItems = [{ ...product, id: 1 }];
      await writeData(this.file, JSON.stringify(arrayItems, null, 2));
      return console.log("ID: ", 1);
    }

    const id = data.length + 1;
    const arrayItems = [...data, { ...product, id: id }];
    await writeData(this.file, JSON.stringify(arrayItems, null, 2));
    return console.log("ID: ", id);
  }

  async getById(id) {
    const data = await getData(this.file);

    if (isIn(id, data)) {
      const productFound = data.find((prd) => prd.id === id);
      return console.log(productFound);
    }
    return console.log(null);
  }

  async getAll() {
    const data = await getData(this.file);
    return console.log(data);
  }

  async deleteById(id) {
    const data = await getData(this.file);
    if (isIn(id, data)) {
      const productsFiltered = data.filter((prd) => prd.id !== id);
      await writeData(this.file, JSON.stringify(productsFiltered, null, 2));
      return console.log(`El elemento ${id} fue eliminado correctamente`);
    }

    return console.log(`El elemento ${id} no fue encontrado en el archivo`);
  }

  async deleteAll() {
    await writeData(this.file, "");

    return console.log("Todos los elementos fueron eliminados correctamente");
  }
}

const c = new Container("./products.json");

const p1 = new Product("Celular", 500, "https://via.placeholder.com/140x100");
const p2 = new Product(
  "Computadora",
  2500,
  "https://via.placeholder.com/140x100"
);
const p3 = new Product("Notebook", 3500, "https://via.placeholder.com/140x100");
const p4 = new Product("Monitor", 800, "https://via.placeholder.com/140x100");

// c.save(p4);
// c.getById(2);
// c.getAll();
// c.deleteById(2);
// c.deleteAll();
