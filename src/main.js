/** @jsx h */
require('./utils/wrap-libs')
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
}

App.prototype = Object.create(Component.prototype)

App.prototype.render = function () {
  console.log('render: ', JSON.stringify(this.state.storeState, null, 2))
  return <Router>
    <HomeRoute path='/' state={this.state.storeState} dispatch={this.props.dispatch} />
  </Router>
}

App.prototype.componentWillMount = function () {
  this.state = {
    storeState: this.props.store()
  }

  this.props.store.subscribe(function () {
    this.setState({
      storeState: this.props.store()
    })
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
render(
  <App
    store={store}
    dispatch={function (action) {
      if (typeof action === 'function') return action(store)
      return store(action)
    }}
  />,
  document.getElementById('app')
)
