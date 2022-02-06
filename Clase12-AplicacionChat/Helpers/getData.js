const fs = require('fs')

const getData = async (file) => {
  try {
    const res = await fs.promises.readFile(file)
    const data = await JSON.parse(res, null, 2)

    return data
  } catch (err) {
    console.log('Read Error', err)
  }
}

module.exports = getData
