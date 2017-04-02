const test = require('ava').test
const {h, render} = require('preact')
const {find} = require('../utils/test-utils')
const home = require('./home')

// initialize a fresh store before each test
test.beforeEach(function (t) {
  t.context.store = require('socrates')({
    home: home.model
  })
  t.context.store({type: 'init:home'})
})

test('home view', function (t) {
  const store = t.context.store
  render(
    h(home.view, {state: store(), dispatch: store}),
    document.body
  )

  const results = find('input', document.body)

  console.log(results[0])

  t.pass()
})
