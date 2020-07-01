const isFloat = value =>
  parseFloat(value) === value && !isNaN(value) && isFinite(value)

module.exports = {
  handler: isFloat,
  aliases: ['float', 'decimal'],
  type: 'type',
  context: '*',
  validateArguments: args => args.length === 0,
}
