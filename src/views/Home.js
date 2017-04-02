/** @jsx h */
const h = require('preact').h
const Navbar = require('../components/Navbar')
const FloatingAction = require('../components/FloatingAction')

const model = {
  namespace: 'home',
  init: function () {
    return {
      message: 'Hello World!'
    }
  },
  message: {
    edit: function (state, payload) {
      return payload
    }
  }
}

function home (props) {
  const dispatch = props.dispatch
  const state = props.state

  return <div>
    <Navbar state={props.state} dispatch={props.dispatch} />
    <div className='relative center measure ph2'>
      <h3>{state.home.message}</h3>
      <input
        type='text'
        value={state.home.message}
        oninput={editMessage}
      />
      <div className='fixed bottom-1 right-1'>
        <div className='flex flex-column'>
          <div class='mb2'>
            <FloatingAction iconClass='fa-wrench' />
          </div>
          <div class='mb2'>
            <FloatingAction iconClass='fa-plus' />
          </div>
        </div>
      </div>
    </div>
  </div>

  function editMessage (e) {
    dispatch({
      type: 'edit home.message',
      payload: e.target.value
    })
  }
}

module.exports = {
  view: home,
  model: model
}
