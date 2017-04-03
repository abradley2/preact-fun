/** @jsx h */
const h = require('preact').h
const render = require('preact').render
const Component = require('preact').Component
const Socrates = require('socrates')
const Router = require('preact-router')

const models = {
  layout: require('./models/layout'),
  todos: require('./models/todos')
}

// require views
const Home = initView(require('./views/Home'))

// declare routes
function HomeRoute (props) {
  return <div>
    <Home state={props.state} dispatch={props.dispatch} />
  </div>
}

// map routes to the App's render function
function App (props) {
  Component.call(this, props)
  this.state = this.props.store()

  this.render = function () {
    return <Router>
      <HomeRoute path='/' state={this.props.store()} dispatch={this.props.dispatch} />
    </Router>
  }
}

App.prototype = Object.create(Component.prototype)

App.prototype.componentWillMount = function () {
  this.props.store.subscribe(function (newState) {
    this.setState(newState)
  }.bind(this))
}

// convenience function. Adds a view's moodel to the store if it has one.
// returns just the "render" function of the view
function initView (view) {
  if (view.model) {
    models[view.model.namespace] = view.model
  }
  return view.view
}

// create the store an initialize the model of each
const store = Socrates(models)

Object.keys(models).forEach(function (namespace) {
  store({type: 'init:' + namespace})
})

// have router resolve and start app
document.addEventListener('DOMContentLoaded', function () {
  const el = document.createElement('div')
  document.body.appendChild(el)
  render(
    <App
      store={store}
      dispatch={function (action) {
        if (typeof action === 'function') return action(store)
        return store(action)
      }}
    />,
    el
  )
  console.log('RENDERED')
})
