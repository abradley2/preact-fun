/** @jsx h */
const h = require('preact').h

const model = {
  namespace: 'home',
  init: function () {
    return {
      message: 'Hello World!'
    }
  },
  message: {
    edit: function (state, payload) {
      return payload.message
    }
  }
}

function home (props) {
  const dispatch = props.dispatch
  const state = props.state

  return <div className='center measure'>
    <h3>{state.home.message}</h3>
    <input
      type='text'
      value={state.home.message}
      oninput={editMessage}
    />
  </div>

  function editMessage (e) {
    dispatch({
      type: 'edit home.message',
      payload: {
        message: e.target.value
      }
    })
  }
}

module.exports = {
  view: home,
  model: model
}
