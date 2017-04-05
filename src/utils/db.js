let db

if (process.env.NODE_ENV !== 'test') {
  const treo = require('treo')
  const schema = require('treo').schema()
    .version(1)
      .addStore('prevState', {key: 'namespace'})
      .addStore('storedState', {key: 'namespace'})
      .addStore('todos', {key: 'id'})

  db = treo('db', schema)
}

module.exports = db
