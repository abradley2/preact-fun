const db = require('../utils/db')
const getId = require('shortid').generate
const i = require('icepick')

module.exports = {
  addTodo: function (payload, dispatch) {
    const newTodo = i.set(payload, 'id', getId())

    db.store('todos').put(newTodo, function (err) {
      if (err) return handleError(dispatch, err)
      dispatch({
        type: 'add todos.list',
        payload: newTodo
      })
    })
  },

  getTodos: function (payload, dispatch) {
    db.store('todos').all(function (err, results) {
      if (err) return handleError(dispatch, err)
      dispatch({
        type: 'fetch todos.list',
        payload: results
      })
    })
  }

}

function handleError (dispatch, err) {
  dispatch({
    type: 'error show',
    payload: err
  })
}
