/** @jsx h */
const h = require('preact').h
const TextField = require('./TextField')

function CreateTodoForm (props) {
  return <div className='center measure ph2'>
    <h3>Create New Todo</h3>
    <TextField
      placeholder='New Todo'
    />
  </div>
}

module.exports = CreateTodoForm
