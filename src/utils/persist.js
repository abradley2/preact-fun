const db = require('./db')
const equal = require('deep-equal')

function save () {
  return Promise.resolve()
}

function load (store) {
  const initialState = store()

  return Promise.resolve()
    .then(function () {
      const getPrevState = defer()

      db.store('prevState').all(function (err, prevState) {
        if (err) {
          return getPrevState.fail(err)
        }

        console.log(prevState)

        if (!equal(prevState, initialState)) {
          return getPrevState.finish(false)
        }

        return getPrevState.finish(true)
      })

      return getPrevState.promise
    })
    .then(function (shouldLoadState) {
      return shouldLoadState
    })
    .catch(function () {
      return Promise.resolve()
    })
}

function defer () {
  const promise = new Promise(function (resolve, reject) {
    promise.resolve = resolve
    promise.reject = reject
  })
  return promise
}

module.exports = {
  save: save,
  load: load
}
