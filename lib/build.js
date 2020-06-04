const Path = require('path')

const readData = require('./util/readData')

async function build(options = {}) {
  const {
    outdir: _outdir = 'build',
  } = options

  const outdir = Path.resolve(process.cwd(), _outdir)

  console.log(`Building the resume at ${outdir}`)

  const data = await readData()

  console.log('data is', data)
}

module.exports = build
