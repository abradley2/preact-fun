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
  const wrapped = function (payload) {
    if (!payload) return store()
    const actionTarget = payload.type.split(/[: .]/)[1]
    store(payload)
    if (!writers[actionTarget]) createWriter(actionTarget)
    writers[actionTarget](store())
  }
  wrapped.subscribe = store.subscribe.bind(store)
  return wrapped
}

function load (store) {
  const initialState = store()

  return Promise.resolve()
    .then(function () {
      const getPrevState = defer()

      db.store('prevState').all(function (err, prevState) {
        if (err) return getPrevState.reject(err)

        if (!equal(indexByNs(prevState), initialState)) {
          return getPrevState.resolve(false)
        }

        return getPrevState.resolve(true)
      })

      return getPrevState.promise
    })
    .then(function (shouldLoadState) {
      if (shouldLoadState) {
        const loadStoredState = defer()
        db.store('storedState').all(function (err, data) {
          if (err) return loadStoredState.reject(err)
          data.forEach(function (item) {
            store({type: 'set ' + item.namespace, payload: item})
          })
          return loadStoredState.resolve()
        })
        return loadStoredState.promise
      }
      return Promise.resolve()
    })
    .then(function () {
      const savePrevState = defer()

      db.store('prevState').batch(values(initialState), function (err) {
        if (err) return savePrevState.reject(err)
        return savePrevState.resolve()
      })
      return savePrevState.promise
    })
    .then(function () {
      return Promise.resolve(wrap(store))
    })
    .catch(function (err) {
      console.error(err)
      return Promise.resolve(store)
    })
}

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
