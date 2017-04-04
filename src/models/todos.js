const getId = require('shortid').generate

const todos = {
  namespace: 'todos',
  init: function () {
    return {
      list: [],
      newTodo: {
        title: '',
        completed: false
      }
    }
  },
  newTodo: {
    title: {
      edit: function (state, payload) {
        return payload
      }
    }
  },
  list: {
    add: function (state, payload) {
      payload.id = getId()
      state.push(payload)
      return state
    },
    remove: function (state, payload) {

    }
  }
}

module.exports = todos
