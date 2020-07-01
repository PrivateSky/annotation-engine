const arrayDuplicates = require('../utils/arrayDuplicates')

const splitWords = (string, delimiter = ' ') => {
  const re = new RegExp(`(?:[^${delimiter}"]+|"[^"]*")+`, 'g')
  const words = string.match(re)
  const duplicates = arrayDuplicates(words)
  if (duplicates.length > 0) {
    throw new Error(`Duplicates: ${duplicates.join(', ')}`)
  }
  return words
}

module.exports = splitWords
