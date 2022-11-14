const UID_GENERATOR = require('uid-generator')
const JWT = require('jsonwebtoken')

// This service provides methods for JWT and token generation and validation

module.exports = {
  // Generate Pseudo-Random Token
  generateToken () {
    return new UID_GENERATOR(process.env.UID_GENERATOR_BITS).generateSync()
  },
  // Create JWT token with user data in payload
  generateJWTToken (_user) {
    const PAYLOAD = {
      id: _user.id,
      email: _user.email,
      firstName: _user.firstName,
      roleId: _user.roleId,
      userType: _user['userType'] || null,
      referenceId: _user['referenceId'] || null
    }
    return JWT.sign(
      PAYLOAD,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY
      })
  }
}
