const test = require('ava').test
const {h, render} = require('preact')
const {find} = require('../utils/test-utils')
const Home = require('./Home')

// initialize a fresh store before each test
test.beforeEach(function (t) {
  t.context.store = require('socrates')({
    layout: require('../models/layout'),
    home: Home.model
  })
  t.context.store({type: 'init:home'})
  t.context.store({type: 'init:layout'})
})

test('home view', function (t) {
  const store = t.context.store
  render(
    h(Home.view, {state: store(), dispatch: store}),
    document.body
  )

  const results = find('input', document.body)

  t.pass(results[0])
})
