const layout = {
  namespace: 'layout',
  init: function () {
    return {
      showDrawer: false
    }
  },
  drawer: {
    toggle: function (state) {
      return {
        showDrawer: !state.showDrawer
      }
    }
  }
}

module.exports = layout
