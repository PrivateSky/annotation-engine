const isInteger = value =>
  parseInt(value) === value &&
  Math.floor(value) === value &&
  !isNaN(value) &&
  isFinite(value)

module.exports = {
  handler: isInteger,
  aliases: ['int', 'integer'],
  type: 'type',
  context: '*',
  validateArguments: args => args.length === 0,
}
