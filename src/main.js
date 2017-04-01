/** @jsx h */
const h = require('preact').h
const render = require('preact').render
const Socrates = require('socrates')
const Router = require('preact-router')

const storeConfig = {}

// require views
const Home = initView(require('./views/home'))

// declare routes
function HomeRoute (props) {
  return <div>
    <Home state={props.state} dispatch={props.dispatch} />
  </div>
}

// map routes
function Main (state, dispatch) {
  return <Router>
    <HomeRoute path='/' state={state} dispatch={dispatch} />
  </Router>
}

// convenience function. Adds a view's moodel to the store if it has one.
// returns just the "render" function of the view
function initView (view) {
  if (view.model) {
    storeConfig[view.model.namespace] = view.model
  }
  return view.view
}

// create the store an initialize the model of each
const store = Socrates(storeConfig)

Object.keys(storeConfig).forEach(function (namespace) {
  store({type: 'init:' + namespace})
})

// have router resolve and start app
render(Main(store(), store), document.getElementById('app'))
