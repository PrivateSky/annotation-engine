module.exports = value => {
  if (value === null) {
    return true
  }
  if (Array.isArray(value)) {
    return false
  }
  return typeof value === 'object'
}
