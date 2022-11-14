module.exports = {
  // Converts given object's all string attributes to lower case
  toLower (_object) {
    const KEYS = Object.keys(_object)
    KEYS.forEach(key => {
      if (typeof _object[key] === 'string') {
        _object[key] = _object[key].toLowerCase()
      }
    })
    return _object
  }
}
