const { describe, it } = require('mocha')
const assert = require('assert').strict

const typeChecks = require('../../src/validators/typecheck')

const validators = {
  isFloat: [1.23, 0.0, 3.1415, -2.14],
  isInt: [1, 2, 3, 0, Math.floor(3.1415926)],
  isNumber: [1.23, 2.34, 4, -1, 0, 0.0, parseFloat(0)],
  isString: ['abcd', '_', ' '],
  isUUID: [
    '12345678-1234-1234-1234-1234567890ab',
    '12345678-1234-4123-1234-1234567890ab',
  ],
}

const against = {
  isInt: ['isFloat', 'isString', 'isUUID'],
  isFloat: ['isString', 'isUUID'],
  isNumber: ['isString', 'isUUID'],
  isString: ['isFloat', 'isInt', 'isNumber'],
  isUUID: ['isInt', 'isFloat', 'isNumber'],
}

describe('Type check definitions', () => {
  Object.keys(validators).forEach(validatorName => {
    const definition = typeChecks[validatorName]
    it(`${validatorName} should be defined as an object`, () => {
      assert.strictEqual(typeof definition, 'object')
    })
    it(`${validatorName} should define a handler function`, () => {
      assert.strictEqual(typeof definition.handler, 'function')
    })
    it(`${validatorName} should define an array of aliases`, () => {
      assert.strictEqual(Array.isArray(definition.aliases), true)
      assert.strictEqual(definition.aliases.length > 0, true)
    })
    it(`${validatorName} should define an ANY (*) context`, () => {
      assert.strictEqual(definition.context, '*')
    })
    it(`${validatorName} should have a validateArguments function`, () => {
      assert.strictEqual(typeof definition.validateArguments, 'function')
    })
    it(`${validatorName} should accept an empty array of arguments`, () => {
      assert.strictEqual(definition.validateArguments([]), true)
    })
    if (validatorName === 'isUUID') {
      it(`${validatorName} should not accept two arguments`, () => {
        assert.strictEqual(definition.validateArguments(['v1', 'v2']), false)
      })
      it(`${validatorName} should accept a valid arguments`, () => {
        assert.strictEqual(definition.validateArguments(['v1']), true)
      })
      it(`${validatorName} should not accept an invalid arguments`, () => {
        assert.strictEqual(definition.validateArguments(['v0']), false)
        assert.strictEqual(definition.validateArguments(['v5']), false)
        assert.strictEqual(definition.validateArguments(['1']), false)
        assert.strictEqual(definition.validateArguments(['4']), false)
        assert.strictEqual(definition.validateArguments(['arg']), false)
        assert.strictEqual(definition.validateArguments(['no argument']), false)
        assert.strictEqual(definition.validateArguments(['uuid']), false)
      })
      it(`${validatorName} should accept only v1-v4 as argument`, () => {
        assert.strictEqual(definition.validateArguments(['v1']), true)
        assert.strictEqual(definition.validateArguments(['v2']), true)
        assert.strictEqual(definition.validateArguments(['v3']), true)
        assert.strictEqual(definition.validateArguments(['v4']), true)
      })
    }
  })
})

describe('Type check validators', () => {
  Object.keys(validators).forEach(validatorName => {
    const testValues = validators[validatorName]
    testValues.forEach(testValue => {
      it(`${validatorName} should return true for ${testValue}`, () => {
        assert.strictEqual(typeChecks[validatorName].handler(testValue), true)
      })
    })

    against[validatorName].forEach(againstValidator => {
      const testValues = validators[againstValidator]
      testValues
        .filter(value => !!value)
        .forEach(testValue => {
          it(`${validatorName} should return false for ${testValue}`, () => {
            assert.strictEqual(
              typeChecks[validatorName].handler(testValue),
              false
            )
          })
        })
    })
    if (validatorName === 'isUUID') {
      it(`${validatorName} should not validate a v1 UUID`, () => {
        const testValue = '12345678-1234-1234-1234-1234567890ab'
        assert.strictEqual(
          typeChecks[validatorName].handler(testValue, 'v4'),
          false
        )
      })
      it(`${validatorName} should validate a v4 UUID`, () => {
        const testValue = '12345678-1234-4234-1234-1234567890ab'
        assert.strictEqual(
          typeChecks[validatorName].handler(testValue, 'v4'),
          true
        )
      })
    }
  })
})
