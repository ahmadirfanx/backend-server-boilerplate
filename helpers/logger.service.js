module.exports = {
  logError (_error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(_error)
    }
  }
}
