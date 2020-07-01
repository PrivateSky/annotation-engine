module.exports = vector => {
  if (vector.length < 2) {
    return false
  }
  return vector.filter((item, idx) => vector.indexOf(item) !== idx)
}
