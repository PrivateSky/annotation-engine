const { handler: isInt } = require('./isInt')
const { handler: isFloat } = require('./isFloat')

const isNumber = value => isInt(value) || isFloat(value)

module.exports = {
  handler: isNumber,
  aliases: ['number'],
  type: 'type',
  context: '*',
  validateArguments: args => args.length === 0,
}
