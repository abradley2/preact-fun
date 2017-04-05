const treo = require('treo')

const schema = treo.schema()
  .version(1)
    .addStore('prevState', {key: 'namespace'})
    .addStore('storedState', {key: 'namespace'})
    .addStore('todos', {key: 'id'})

module.exports = treo('db', schema)
