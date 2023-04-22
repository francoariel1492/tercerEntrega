const fs = require('fs')


class FilesDao {
  constructor(file) {
    this.file = `${process.cwd()}/src/db/${file}`
  }

  async loadItems() {
    if (fs.existsSync(this.file)) {
      const data = await fs.promises.readFile(this.file, 'utf-8')
      const items = JSON.parse(data)
      return items
    }
    return 'El archivo no existe'
  }
}

module.exports = FilesDao