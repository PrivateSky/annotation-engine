const splitWords = require('./splitWords')

const _cleanupQuotes = value =>
  value.replace(/^["']/, '').replace(/['"]$/, '').replace(/\\"/g, '"')

module.exports = words => {
  return words.map(word => {
    const matches = word.split(':', 2)
    const rule = matches[0]
    const args = matches[1]
      ? splitWords(matches[1], ',').map(_cleanupQuotes)
      : []
    return { rule, args }
  })
}
