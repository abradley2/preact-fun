const db = require('../utils/db')
const getId = require('shortid').generate
const i = require('icepick')

module.exports = {
  addTodo: function (payload, dispatch) {
    const newTodo = i.set(payload, 'id', getId())

    db.store('todos').put(newTodo, function (err) {
      if (err) return
      dispatch({
        type: 'add todos.list',
        payload: newTodo
      })
    })
  }
}
