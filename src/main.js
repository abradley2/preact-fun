/** @jsx h */
require('es6-promise').polyfill()
require('./utils/wrap-libs')
const h = require('preact').h
const persist = require('./utils/persist')
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
  this.state = {
    storeState: props.store()
  }
}

App.prototype = Object.create(Component.prototype)
App.prototype.constructor = App

App.prototype.render = function () {
  return <Router>
    <HomeRoute path='/' state={this.state.storeState} dispatch={this.props.dispatch} />
  </Router>
}

App.prototype.componentWillMount = function () {
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
    const ns = view.model.init().namespace
    models[ns] = view.model
  }
  return view.view
}

// create the store an initialize the model of each
const store = Socrates(Object.assign(models), {
  setState: function (state, payload) {
    return payload
  }
})

Object.keys(models).forEach(function (namespace) {
  store({type: 'init:' + namespace})
})

// have router resolve and start app
const loadApp = process.env.NODE_ENV === 'development'
  ? persist.load(store)
  : Promise.resolve(store)

loadApp.then(function (appStore) {
  render(
    <App
      store={appStore}
      dispatch={function (action) {
        if (typeof action === 'function') return action(appStore)
        appStore(action)
      }}
    />,
    document.getElementById('app')
  )
})
