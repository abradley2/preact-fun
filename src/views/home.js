/** @jsx h */
const h = require('preact').h

const model = {
  namespace: 'home',
  init: function () {
    return {
      message: 'Hello World!'
    }
  },
  editMessage: function (state, payload) {
    return {
      message: payload.message
    }
  }
}

function home (props) {
  const dispatch = props.dispatch
  const state = props.state

  return <div>
    <h3>{state.home.message}</h3>
    <input
      type='text'
      value={state.home.message}
      oninput={function (e) {
        dispatch('home:editMessage', {message: e.target.value})
      }}
    />
  </div>
}

module.exports = {
  view: home,
  model: model
}
