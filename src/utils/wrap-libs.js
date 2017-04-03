const aphrodite = require('aphrodite')

aphrodite.css = (function (css) {
  return function () {
    var className = ''
    var args = []
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i]
      if (typeof arg === 'string') {
        className += (' ' + arg)
      } else {
        args.push(arg)
      }
    }
    return className + ' ' + css.apply(aphrodite, args)
  }
})(aphrodite.css)

aphrodite.StyleSheet.create = (function (create) {
  return function (styles) {
    var toApply = {}
    for (var name in styles) {
      if (typeof styles[name] !== 'string') {
        toApply[name] = styles[name]
      }
    }
    return Object.assign(
      styles,
      create.call(aphrodite.StyleSheet, toApply)
    )
  }
})(aphrodite.StyleSheet.create)

if (typeof Object.assign !== 'function') {
  Object.assign = function (target, varArgs) {
    'use strict'
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    var to = Object(target)

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index]

      if (!nextSource) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey]
          }
        }
      }
    }
    return to
  }
}
