/** @jsx h */
const h = require('preact').h

function TodoList (props) {
  const state = props.state.todos.list

  return <div className='ph2'>
    <ul
      data-role='todo-list'
      className='list pl0'
    >{state.map(function (todo) {
      return <li
        className='pv3 b--black-20 bb f4'
        key={todo.id}
      >
        {todo.title}
      </li>
    })}</ul>
  </div>
}

module.exports = TodoList
