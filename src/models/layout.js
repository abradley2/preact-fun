const layout = {
  namespace: 'layout',
  init: function () {
    return {
      showingDrawer: false
    }
  },
  showingDrawer: {
    toggle: function (state) {
      return !state
    }
  }
}

module.exports = layout
