const { describe, it } = require('mocha')
const assert = require('assert').strict

const splitWords = require('../../src/parser/splitWords')

describe('Parser - splitWords', () => {
  it('should be defined', () => {
    assert.strictEqual(splitWords !== undefined, true)
  })
  it('should be a function', () => {
    assert.strictEqual(typeof splitWords, 'function')
  })
  it('should accept a string as argument', () => {
    assert.doesNotThrow(() => {
      splitWords('int required')
    })
  })
  it('should return an array', () => {
    const actual = splitWords('int required')
    assert.strictEqual(Array.isArray(actual), true)
  })
  it('should return an array of strings', () => {
    const actual = splitWords('int required')
    assert.strictEqual(
      actual.every(value => typeof value === 'string'),
      true
    )
  })
  it('should parse simple definitions', () => {
    const [first, second, third] = splitWords('int unsigned required')
    assert.strictEqual(first, 'int')
    assert.strictEqual(second, 'unsigned')
    assert.strictEqual(third, 'required')
  })
  it('should throw if duplicate elements and indicate them', () => {
    try {
      splitWords('int unsigned required unsigned min:3 required')
      assert.strictEqual(false, true)
    } catch (err) {
      assert.strictEqual(err.message, 'Duplicates: unsigned, required')
    }
  })
  it('should not throw if duplicate elements with different arguments', () => {
    const [first, second, third, fourth, fifth] = splitWords(
      'int min:3 required unsigned min:10'
    )
    assert.strictEqual(first, 'int')
    assert.strictEqual(second, 'min:3')
    assert.strictEqual(third, 'required')
    assert.strictEqual(fourth, 'unsigned')
    assert.strictEqual(fifth, 'min:10')
  })
  it('should consider double quotes', () => {
    const result = splitWords(
      'string in:"a and b","c and d","e and f" required eq:"double value" match:foo'
    )
    assert.strictEqual(result.length, 5)
    assert.strictEqual(result[0], 'string')
    assert.strictEqual(result[1], 'in:"a and b","c and d","e and f"')
    assert.strictEqual(result[2], 'required')
    assert.strictEqual(result[3], 'eq:"double value"')
    assert.strictEqual(result[4], 'match:foo')
  })
  it('should consider double quotes and ignore escaped quotes', () => {
    const result = splitWords('string in:"a and \\"b\\"","\\"c\\" and d" foo')
    assert.strictEqual(result.length, 3)
    assert.strictEqual(result[0], 'string')
    assert.strictEqual(result[1], 'in:"a and \\"b\\"","\\"c\\" and d"')
    assert.strictEqual(result[2], 'foo')
  })
})
