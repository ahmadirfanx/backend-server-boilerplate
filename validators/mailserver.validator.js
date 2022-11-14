const VALIDATOR = require('node-input-validator')
const MODELS = require('../models/index')

// This service contains validators for data

module.exports = {
  // validator for create request
  create: function (_reqBody) {
    const VALIDATE = new VALIDATOR.Validator(_reqBody, {
      host: 'required',
      port: 'required',
      email: 'required',
      password: 'required',
      isSSLTLS: 'required'
    })
    return VALIDATE
  },
  // validator for patch request
  patch: function (_reqBody) {
    const VALIDATE = new VALIDATOR.Validator(_reqBody, {
    })
    return VALIDATE
  }
}
