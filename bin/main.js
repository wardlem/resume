#!/usr/bin/env node

const yargs = require('yargs')

// eslint-disable-next-line no-unused-expressions
yargs
  .command('build', 'build the resume', (yargs) => {
    yargs.option('outdir', {
      alias: 'o',
      type: 'string',
      description: 'Specify the output directory',
      default: 'build',
    })
  }, async (argv) => {
    const build = require('../lib/build')
    await build({
      outdir: argv.outdir,
    })
  })
  .argv
