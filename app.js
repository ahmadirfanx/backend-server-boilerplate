const EXPRESS = require('express')
const PATH = require('path')
const COOKIE_PARSER = require('cookie-parser')
const CORS = require('cors')
const PASSPORT = require('passport')
const LOGGER = require('morgan')
const RoutesHandler = require('./middlewares/routes-handler.service')
const FS = require('fs')

// env file
require('dotenv').config()

// passport config file
require('./config/passport')

const APP = EXPRESS()

/** Routes Mounting for App */
RoutesHandler.mountRoutes(APP)

// Cors setup
APP.use(CORS())
APP.options('*', CORS())


APP.use(LOGGER('dev'))
APP.use(EXPRESS.json())
APP.use(EXPRESS.urlencoded({ extended: false }))
APP.use(COOKIE_PARSER())
APP.use(PASSPORT.initialize())

// eslint-disable-next-line no-undef
APP.use(EXPRESS.static(PATH.join(__dirname, '/public')))
APP.use(EXPRESS.static('public'))


module.exports = APP
