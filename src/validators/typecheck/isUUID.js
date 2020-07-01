const { handler: isString } = require('./isString')

const dashes = [8, 13, 18, 23]

const isUUID = (value, version) =>
  isString(value) &&
  value.length === 36 &&
  dashes.every(idx => value[idx] === '-') &&
  /^[0-9a-f-]{36}$/.test(value) &&
  (version === 'v4' ? value[14] === '4' : true)

const validateArguments = args => {
  if (args.length === 0) {
    return true
  }
  if (args.length !== 1) {
    return false
  }
  const validArguments = ['v1', 'v2', 'v3', 'v4']
  return validArguments.indexOf(args[0]) >= 0
}

module.exports = {
  handler: isUUID,
  aliases: ['uuid', 'uniqueid'],
  type: 'type',
  context: '*',
  validateArguments,
}
