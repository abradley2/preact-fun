/** @jsx h */
const h = require('preact').h
const todoActions = require('../actions/todos')
const TextField = require('./TextField')
const Button = require('./Button')

function CreateTodoForm (props) {
  const state = props.state.todos.newTodo
  const dispatch = props.dispatch

  return <div className='center measure ph2'>
    <h3>Create New Todo</h3>
    <TextField
      placeholder='New Todo'
      value={state.title}
      oninput={editTitle}
    />
    <div className='mt3'>
      <Button onclick={createTodo}>Create!</Button>
    </div>
  </div>

  function editTitle (e) {
    dispatch({
      type: 'edit todos.newTodo.title',
      payload: e.target.value
    })
  }

  function createTodo () {
    const newTodo = {
      title: state.title
    }
    todoActions.addTodo(newTodo, dispatch)
    dispatch({type: 'reset todos.newTodo'})
    if (props.oncreate) props.oncreate(newTodo)
  }
}

module.exports = CreateTodoForm
