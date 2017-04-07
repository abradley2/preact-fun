const test = require('ava').test
const {h, render} = require('preact')
const {getSelector} = require('../utils/test-utils')
const Home = require('./Home')

// initialize a fresh store before each test
test.beforeEach(function (t) {
  // included any models used in the view
  const models = {
    layout: require('../models/layout'),
    todos: require('../models/todos'),
    home: Home.model
  }
  t.context.store = require('socrates')(models)
  for (var ns in models) {
    t.context.store({type: 'init ' + ns})
  }
})

test('home view', function (t) {
  const store = t.context.store
  render(
    h(Home.view, {state: store(), dispatch: store}),
    document.body
  )

  const $ = getSelector(document.body)

  t.pass($)
})
