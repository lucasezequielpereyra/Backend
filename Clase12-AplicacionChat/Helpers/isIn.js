const fs = require('fs')

const isIn = (id, array) => {
  return array.some((item) => item.id == id)
}

module.exports = isIn
