const CRYPTO = require('./crypto.service')
const BaseModel = require('../models/BaseModel')
const MESSAGES = require('./messages.service')
const PASSPORT = require('passport')
const LOCAL_STRATEGY = require('passport-local').Strategy
const JWT_STRATEGY = require('passport-jwt').Strategy
const EXTRACT_JWT = require('passport-jwt').ExtractJwt
const LOGGER = require('./logger.service')

// Strategy to login user
PASSPORT.use(new LOCAL_STRATEGY({ usernameField: 'email' }, (_email, _password, _done) => {
  let User = BaseModel.getModel('User')
  // check if user exists
  User.findOne({ where: { email: _email } }).then(async (_user) => {
    // user exists
    if (!_user.isActive) {
      // check for isActive
      return _done(null, false, MESSAGES.NOT_ACTIVE)
    } else if (CRYPTO.verifyHash(CRYPTO.decrypt(_password), _user.password)) {
      /**  user authenticated here */

      // append other data to store in jwt here
      // ...

      return _done(null, _user)
    } else if (_user.isMicrosoftLinked) {
      // user not authenticated but linked with Microsoft
      return _done(null, false, MESSAGES.RESET_PASSWORD_AND_LINKED_WITH_MICROSOFT)
    } else if (_user.isGoogleLinked) {
      // user not authenticated but linked with Google
      return _done(null, false, MESSAGES.RESET_PASSWORD_AND_LINKED_WITH_GOOGLE)
    } else {
      // password mismatched
      return _done(null, false, MESSAGES.INCORRECT_PASSWORD)
    }
  }).catch((_error) => {
    // user not exists
    LOGGER.logError(_error)
    return _done(null, false, MESSAGES.USER_NOT_FOUND)
  })
}))

// JWT Strategy to check authentication
const OPTIONS = {
  jwtFromRequest: EXTRACT_JWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'My_Secret#123',
  ignoreExpiration: false,
  jsonWebTokenOptions: {
    maxAge: process.env.JWT_EXPIRY
  }
}
PASSPORT.use('jwt', new JWT_STRATEGY(OPTIONS, (_req, done) => {
  let User = BaseModel.getModel('User')
  User.findOne({
    where: {
      email: _req.email
    }
  }).then(_user => {
    if (_user && _user.isActive) {
      done(null, _user)
    } else if (_user && !_user.isActive) {
      done(null, false, MESSAGES.NOT_ACTIVE)
    } else {
      done(null, false, MESSAGES.AUTHENTICATION_FAILED)
    }
  }).catch(_error => {
    LOGGER.logError(_error)
    done(null, false, _error)
  })
}
))
