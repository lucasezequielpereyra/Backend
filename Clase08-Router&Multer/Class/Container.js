// Helpers
const getData = require('../Helpers/getData')
const isIn = require('../Helpers/isIn')
const writeData = require('../Helpers/writeData')

class Container {
  constructor(file) {
    this.file = file
  }

  async save(product) {
    const data = await getData(this.file)

    if (!data) {
      const arrayItems = [{ ...product, id: 1 }]
      await writeData(this.file, JSON.stringify(arrayItems, null, 2))
      return `El producto ${product.name}, fue agregado con exito y su id es 1`
    }

    const id = data[data.length - 1].id + 1
    const arrayItems = [...data, { ...product, id: id }]
    await writeData(this.file, JSON.stringify(arrayItems, null, 2))

    return `El producto ${product.name}, fue agregado con exito y su id es ${id} `
  }

  async getAll() {
    const data = await getData(this.file)
    return data
  }

  async getById(id) {
    const data = await this.getAll()

    if (isIn(id, data)) {
      const productFound = data.find((prd) => prd.id == id)
      return productFound
    }
    return 'Producto no encontrado'
  }

  async getRandomItem() {
    const data = await this.getAll()
    const random = Math.round(Math.random() * (data.length - 1))
    return data[random]
  }

  async deleteById(id) {
    const data = await this.getAll()
    if (isIn(id, data)) {
      const productsFiltered = data.filter((prd) => prd.id != id)
      await writeData(this.file, JSON.stringify(productsFiltered, null, 2))
      return `El elemento ${id} fue eliminado correctamente`
    }

    return `El elemento ${id} no fue encontrado en el archivo`
  }

  async deleteAll() {
    await writeData(this.file, '')
  }

  async editById(id, newProps) {
    const data = await this.getAll()

    if (isIn(id, data)) {
      const index = data.findIndex((prd) => prd.id == id)
      data[index] = {
        ...newProps,
        id: data[index].id,
      }
      await writeData(this.file, JSON.stringify(data, null, 2))
      return `El producto ${id} se actualizo correctamente`
    }
    return `El producto ${id} no fue encontrado`
  }
}

module.exports = Container
