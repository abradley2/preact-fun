// stub over any actions used
// TODO: create a master "test-mock" folder for this
Object.assign(require('../actions'), {
  todos: {
    getTodos: Function.prototype
  }
})
