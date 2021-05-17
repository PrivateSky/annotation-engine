const { describe, it } = require('mocha')
const assert = require('assert').strict

const extractRules = require('../../src/parser/extractRules')

describe('Parser - extractRules', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof extractRules, 'function')
  })
  it('should accept an array of words', () => {
    assert.doesNotThrow(() => {
      extractRules(['int', 'required', 'unsigned'])
    })
  })
  it('should transform simple', () => {
    const [first, second, third] = extractRules(['int', 'required', 'unsigned'])
    assert.deepStrictEqual(first, { rule: 'int', args: [] })
    assert.deepStrictEqual(second, { rule: 'required', args: [] })
    assert.deepStrictEqual(third, { rule: 'unsigned', args: [] })
  })
  it('should correctly extract arguments', () => {
    const [first, second, third, fourth] = extractRules([
      'int',
      'required',
      'min:3',
      'between:3,15',
    ])
    assert.deepStrictEqual(first, { rule: 'int', args: [] })
    assert.deepStrictEqual(second, { rule: 'required', args: [] })
    assert.deepStrictEqual(third, { rule: 'min', args: ['3'] })
    assert.deepStrictEqual(fourth, { rule: 'between', args: ['3', '15'] })
  })
  it('should consider quotes for arguments', () => {
    const [first, second, third, fourth, fifth] = extractRules([
      'string',
      'in:"a b","c,d","e, f","g ,h"',
      'required',
      'eq:"double"',
      'match:"foo , bar"',
    ])
    assert.deepStrictEqual(first, { rule: 'string', args: [] })
    assert.deepStrictEqual(second, {
      rule: 'in',
      args: ['a b', 'c,d', 'e, f', 'g ,h'],
    })
    assert.deepStrictEqual(third, { rule: 'required', args: [] })
    assert.deepStrictEqual(fourth, { rule: 'eq', args: ['double'] })
    assert.deepStrictEqual(fifth, { rule: 'match', args: ['foo , bar'] })
  })
  it('should preserve and clean escaped quotes in args', () => {
    const [result] = extractRules(['in:"a and \\"b\\"","\\"c\\" and d"'])
    assert.strictEqual(result.rule, 'in')
    assert.deepStrictEqual(result.args, ['a and "b"', '"c" and d'])
  })
})
