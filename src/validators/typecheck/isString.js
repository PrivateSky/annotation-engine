const isString = value =>
  value.length !== undefined && value.concat && typeof value === 'string'

module.exports = {
  handler: isString,
  aliases: [
    'string',
    'text',
    'characters',
    'word',
    'words',
    'phrase',
    'phrases',
    'html',
    'sentence',
    'sentences',
  ],
  type: 'type',
  context: '*',
  validateArguments: args => args.length === 0,
}
