const FS = require('fs')

const validators = {}

FS.readdirSync('./validators').forEach(function (file) {
  // validators [file.split('.')[0].toString()] = require('./' + file)

  if (!file.includes('.js')) {
    FS.readdirSync('./validators/' + file).forEach(function (subFile) {
      // ROUTER.use('/' + file + '/' + subFile.split('.')[0].toString(), require('./' + file + '/' + subFile))
      validators[file.split('.')[0].toString()] = require('./' + file + '/' + subFile)
    })
  } else {
    if (file.split('.')[0].toString() !== 'index') {
      // ROUTER.use('/' + file.split('.')[0].toString(), require('./' + file))
      validators[file.split('.')[0].toString()] = require('./' + file)
    }
  }
})

module.exports = validators
