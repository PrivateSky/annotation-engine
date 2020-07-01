# Fluent Validation

Let's start with an example:

```
const schema = new Schema('int unsigned default:3')
const value = schema.create()
assert.strictEqual(value, 3)

const received = -1
try {
  schema.setValue(received)
} catch (err) {
  assert.strictEqual(err.type, 'validation')
  assert.deepStrictEqual(err.details, 'unsigned')
}
```

or, maybe something more complicated:

```
const schema = new Schema({
  id: 'int unsigned default:3',
  name: 'string required min:2 max:255',
  email: 'string required email unique:checkByEmail',
})

schema.inject('checkByEmail', async => value => {
  const existent = await db.findByEmail({email:value})
  return !!existent
})

try {
  await schema.setValue({
    id: -1,
    name: 'M',
    email: 'existent@already.com'
  })
} catch (err) {
  assert.strictEqual(err.type, 'validation')
  assert.deepStrictEqual(err.details, { id: 'unsigned', name: 'min:2', email: 'unique' })
}
```
