/** @jsx h */
const h = require('preact').h
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
    <div className='pv2' />
    <Button>Create!</Button>
  </div>

  function editTitle (e) {
    console.log(e.target.value)
    dispatch({
      type: 'edit todos.newTodo.title',
      payload: e.target.value
    })
  }
}

module.exports = CreateTodoForm
