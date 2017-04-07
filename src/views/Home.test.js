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

test('should simply render the main view', function (t) {
  const store = t.context.store
  render(
    h(Home.view, {state: store(), dispatch: store}),
    document.body
  )

  const $ = getSelector(document.body)

  t.truthy($('body').innerHTML)

  t.pass()
})

test('should be able to add a todo', function (t) {
  const store = t.context.store

  store({
    type: 'add todos.list',
    payload: {
      title: 'New Todo'
    }
  })

  render(
    h(Home.view, {state: store(), dispatch: store})
  )

  const $ = getSelector(document.body)

  t.true(
    $('ul[data-role="todo-list"]').children.length === 1
  )

  t.pass()
})
