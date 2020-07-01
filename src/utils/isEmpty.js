const isString = require('./isString')
const isObject = require('./isObject')
const isArray = require('./isArray')
const isFunction = require('./isFunction')

const isEmpty = value => {
  if (value === undefined) return true

  if (isFunction(value)) {
    return true
  }

  if (isString(value)) {
    return value.length === 0
  }

  if (isObject(value)) {
    return Object.keys(value).every(
      attribute =>
        Object.hasOwnProperty.call(value, attribute) &&
        isEmpty(value[attribute])
    )
  }

  if (isArray(value)) {
    return value.length === 0 || value.every(child => isEmpty(child))
  }

  if (value === 0 || value === 0.0 || value === false) {
    return false
  }

  return !!value
}

module.exports = isEmpty
