const BCRYPT = require('bcryptjs')
const CRYPTO_JS = require('crypto-js')

// Service to encrypt/decrypt string

module.exports = {
  // Generate password hash
  generateHash (_plainText) {
    let hash = BCRYPT.genSaltSync(parseInt(process.env.SALT))
    hash = BCRYPT.hashSync(_plainText, hash)
    return hash
  },

  // Verify password hash
  verifyHash (_plainText, _hash) {
    return BCRYPT.compareSync(_plainText, _hash)
  },

  // encrypt plaintext
  encrypt (_plainText, isInFlightCipher = false) {
    if (_plainText === '') {
      return ''
    }
    // key to use when decrypting at rest vs in flight
    const key = isInFlightCipher ? process.env.CRYPTO_SECRET_AT_FLIGHT : process.env.CRYPTO_SECRET
    return CRYPTO_JS.AES.encrypt(_plainText, key).toString()
  },

  // decrypt cipher text
  decrypt (_cipherText, isInFlightCipher = false) {
    if (_cipherText === '') {
      return ''
    }
    // key to use when decrypting at rest vs in flight
    const key = isInFlightCipher ? process.env.CRYPTO_SECRET_AT_FLIGHT : process.env.CRYPTO_SECRET
    return CRYPTO_JS.AES.decrypt(_cipherText, key).toString(CRYPTO_JS.enc.Utf8)
  }
  
}
