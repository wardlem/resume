const {
  promises: FileSystem,
} = require('fs')

const Path = require('path')

const Yaml = require('js-yaml')

module.exports = readData

async function readData(options = {}) {
  const {
    datadir: _datadir = 'data',
  } = options

  const datadir = Path.resolve(process.cwd(), _datadir)
  return readDirectory(datadir)
}

async function readDirectory(path) {
  const entries = await FileSystem.readdir(path, {withFileTypes: true})
  const data = await Promise.all(entries.map(async (entry) => {
    const fullPath = Path.resolve(path, entry.name)
    if (entry.isDirectory()) {
      const records = await readDirectory(fullPath)
      return [entry.name, records]
    } else if (entry.isFile() && Path.extname(entry.name) === '.yml') {
      const record = await readFile(Path.resolve(path, entry.name))
      const basename = Path.basename(entry.name, '.yml')
      return [basename, record]
    }

    // Null values are filtered out
    return null
  }))

  return Object.fromEntries(data.filter(Boolean))
}

async function readFile(path) {
  const contents = await FileSystem.readFile(path)
  return Yaml.safeLoad(contents)
}
