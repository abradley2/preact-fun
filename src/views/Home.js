/** @jsx h */
const h = require('preact').h
const Navbar = require('../components/Navbar')
const FloatingAction = require('../components/FloatingAction')
const BottomSheet = require('../components/BottomSheet')

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
      <div className='fixed z-2 bottom-0 right-0 left-0'>
        <div className='mb3 mr2 fr db'>
          {state.layout.showingBottomSheet
            ? <FloatingAction
              iconClass='fa-plus rotate-45 transition'
              onclick={showCreate}
            />
            : <FloatingAction
              iconClass='fa-plus transition'
              onclick={showCreate}
            />
          }
        </div>
        <BottomSheet state={props.state} dispatch={props.dispatch}>
          <h3>Some Content</h3>
        </BottomSheet>
      </div>
    </div>
  </div>

  function showCreate () {
    dispatch({
      type: 'toggle layout.showingBottomSheet'
    })
  }

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
