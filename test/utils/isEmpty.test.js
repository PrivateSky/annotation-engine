const { describe, it } = require('mocha')
const assert = require('assert').strict

const isEmpty = require('../../src/utils/isEmpty')

describe('Empty', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof isEmpty, 'function')
  })

  const empty = {
    'an undefined': undefined,
    'an empty object': {},
    'a function': () => true,
    'an empty string': '',
    'an empty array': [],
    'an array of empty objects': [{}, {}],
    'an array of empty values': [{}, undefined, [], () => true, ''],
  }

  const nonEmpty = {
    'a zero int value': 0,
    'a zero float value': 0.0,
    'a string': 'foo',
    'an object': { foo: 'bar' },
    'a space-only string': ' ',
    'an array': [{}, '', 'bar'],
    'an array of objects': [{}, undefined, { foo: 'bar' }],
  }

  Object.keys(empty).forEach(description => {
    it(`should detect ${description}`, () => {
      const valueToSend = empty[description]
      assert.strictEqual(isEmpty(valueToSend), true)
    })
  })

  Object.keys(nonEmpty).forEach(description => {
    it(`should not detect ${description}`, () => {
      const valueToSend = nonEmpty[description]
      assert.strictEqual(isEmpty(valueToSend), false)
    })
  })
})
