const fs = require('fs')

const writeData = async (file, content) => {
  try {
    await fs.promises.writeFile(file,content)
  } catch (err) {
    console.log("Write Error", err)
  }
}

module.exports = writeData