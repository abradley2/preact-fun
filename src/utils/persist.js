const db = require('./db')
const equal = require('deep-equal')

const writers = {}

function createWriter (namespace) {
  writers[namespace] = bottleneck(function (state) {
    const save = Object.assign({namespace: namespace}, state[namespace])
    db.store('storedState').put(namespace, save, Function.prototype)
  }, 500)
}

function wrap (store) {
  // wrap the store so it saves on every action dispatch
  const wrapped = function (payload) {
    if (!payload) return store()
    const actionTarget = payload.type.split(/[: .]/)[1]
    store(payload)
    if (!writers[actionTarget]) createWriter(actionTarget)
    writers[actionTarget](store())
  }
  // mimick redux store api
  wrapped.subscribe = store.subscribe.bind(store)
  wrapped.getState = store
  return wrapped
}

function load (store) {
  const initialState = store()

  return Promise.resolve()
    // load previous state. Check if there was a change, use this to determine if
    // the stored state should be loaded
    .then(function () {
      const getPrevState = defer()

      db.store('prevState').all(function (err, prevState) {
        if (err) return getPrevState.reject(err)

        if (!equal(indexByNs(prevState), initialState)) {
          console.log('different states: ', indexByNs(prevState), initialState)
          return getPrevState.resolve(false)
        }

        return getPrevState.resolve(true)
      })

      return getPrevState.promise
    })
    // if the stored state should be loaded, then do so. Otherwise skip
    // to end of this
    .then(function (shouldLoadState) {
      if (!shouldLoadState) return Promise.resolve()
      const loadStoredState = defer()
      db.store('storedState').all(function (err, data) {
        if (err) return loadStoredState.reject(err)
        data.forEach(function (item) {
          store({type: 'set ' + item.namespace, payload: item})
        })
        return loadStoredState.resolve()
      })
      return loadStoredState.promise
    })
    // the current state of the store should be stored as the prevState
    // so we can compare it in the previous block next time
    .then(function () {
      const savePrevState = defer()
      const newInitialState = store()

      db.store('prevState').batch(values(newInitialState), function (err) {
        if (err) return savePrevState.reject(err)
        return savePrevState.resolve()
      })
      return savePrevState.promise
    })
    // return a wrapped store so it will save state on dispatch
    .then(function () {
      return Promise.resolve(wrap(store))
    })
    .catch(function (err) {
      // if something went wrong, log the error, and clear the stores
      console.error(err)
      db.store('storedState').clear(Function.prototype)
      db.store('prevState').clear(Function.prototype)
      return Promise.resolve(store)
    })
}

// Utility functions

function bottleneck (func, time) {
  var lastArgs = []
  var pending = false
  function debounced () {
    lastArgs = arguments
    if (pending) {
      clearTimeout(pending)
    }
    pending = setTimeout(function () {
      func.apply({}, lastArgs)
    }, time)
  }
  return debounced
}

function defer () {
  var _resolve
  var _reject
  const promise = new Promise(function (resolve, reject) {
    _resolve = resolve
    _reject = reject
  })
  return {
    promise: promise,
    resolve: _resolve,
    reject: _reject
  }
}

function values (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key]
  })
}

function indexByNs (items) {
  return items.reduce(function (acc, cur) {
    acc[cur.namespace] = cur
    return acc
  }, {})
}

module.exports = {
  load: load
}
