require('babel-register')
require('undom/register')
const test = require('ava').test

test('home view', function (t) {
  const home = require('./home')
  home.view({})
  t.pass()
})
