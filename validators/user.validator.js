const VALIDATOR = require('node-input-validator')
const MODELS = require('../models/index')

// This service contains validators for data

module.exports = {
  // validator for create request
  create: function (_reqBody) {
    const VALIDATE = new VALIDATOR.Validator(_reqBody, {
      firstName: 'required',
      lastName: 'required',
      email: 'required',
      contact: 'required',
      password: 'required'
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
