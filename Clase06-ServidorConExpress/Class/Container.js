// Helpers
const getData = require('../Helpers/getData')
const isIn = require('../Helpers/isIn')
const writeData = require('../Helpers/writeData')


class Container {
  constructor(file) {
    this.file = file
  }
  
  async save (product) {
    const data = await getData(this.file)

    if (!data) {
      const arrayItems = [ { ...product, id:1 } ]
      await writeData(this.file, JSON.stringify(arrayItems, null, 2))
      return console.log('ID: ', 1)
    }

    const id = data.length + 1
    const arrayItems = [ ...data, { ...product, id: id } ]
    await writeData(this.file, JSON.stringify(arrayItems, null, 2))
    return console.log('ID: ', id)
  } 

  async getById(id) {
    const data = await getData(this.file)

    if (isIn(id, data)) {
      const productFound = data.find((prd) => prd.id === id)
      return console.log(productFound)
    }
    return console.log(null)
  }

  async getAll() {
    const data = await getData(this.file)
    return data
  }

  async getRandomItem() {
    const data = await getData(this.file)
    const random = Math.round(Math.random() * (data.length - 1))
    return data[random]
  }

  async deleteById(id) {
    const data = await getData(this.file)
    if (isIn(id, data)) {
      const productsFiltered = data.filter((prd) => prd.id !== id)
      await writeData(this.file, JSON.stringify(productsFiltered, null, 2))
      return console.log(`El elemento ${id} fue eliminado correctamente`)
    }

    return console.log(`El elemento ${id} no fue encontrado en el archivo`)
  }

  async deleteAll() {
    await writeData(this.file, '')
  }
}

module.exports = Container