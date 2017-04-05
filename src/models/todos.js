const getId = require('shortid').generate
const i = require('icepick')

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
    fetch: function (state, payload) {
      return payload
    },
    add: function (state, payload) {
      return i.push(state, {
        title: payload.title,
        id: getId()
      })
    },
    remove: function (state, payload) {

    }
  }
}

module.exports = todos
