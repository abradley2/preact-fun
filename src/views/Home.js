/** @jsx h */
const h = require('preact').h
const Component = require('preact').Component
const todoActions = require('../actions/todos')
const Navbar = require('../components/Navbar')
const FloatingAction = require('../components/FloatingAction')
const BottomSheet = require('../components/BottomSheet')
const CreateTodoForm = require('../components/CreateTodoForm')

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

function Home (props) {
  Component.call(this, props)
}

Home.prototype = Object.create(Component.prototype)
Home.prototype.constructor = Home

Home.prototype.render = function () {
  const state = this.props.state
  const dispatch = this.props.dispatch

  return <div>
    <Navbar state={state} dispatch={dispatch} />
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
        <BottomSheet state={state} dispatch={dispatch}>
          <CreateTodoForm
            state={state}
            dispatch={dispatch}
            oncreate={hideCreate}
          />
        </BottomSheet>
      </div>
    </div>
  </div>

  function showCreate () {
    dispatch({
      type: 'toggle layout.showingBottomSheet'
    })
  }

  function hideCreate () {
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

Home.prototype.componentDidMount = function () {
  todoActions.getTodos(null, this.props.dispatch)
}

module.exports = {
  view: Home,
  model: model
}
