/** @jsx h */
const h = require('preact').h

function TodoList (props) {
  const state = props.state.todos.list

  return <div className='ph2'>
    <ul
      className='list pl0'
    >{state.map(function (todo) {
      return <li key={todo.id}>
        {todo.title}
      </li>
    })}</ul>
  </div>
}

module.exports = TodoList
