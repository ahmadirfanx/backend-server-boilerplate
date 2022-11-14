module.exports = {
  encode (_string) {
    return _string.replace(/\//g, '%2F').replace(/\+/g, '%2B').replace(/\./g, '%2E')
  },
  decode (_string) {
    return _string.replace(/%2F/g, '/').replace(/%2B/g, '+').replace(/%2E/g, '.')
  }
}
