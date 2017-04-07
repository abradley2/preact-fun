const getId = require('shortid').generate
const i = require('icepick')

const todos = {
  init: function () {
    return {
      namespace: 'todos',
      list: [],
      newTodo: {
        title: ''
      }
    }
  },
  newTodo: {
    title: {
      edit: function (state, payload) {
        return payload
      }
    },
    reset: function () {
      return {
        title: '',
        completed: false
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
        id: getId(),
        completed: false,
        subtacks: []
      })
    },
    remove: function (state, payload) {

    }
  }
}

module.exports = todos
