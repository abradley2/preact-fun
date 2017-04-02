const layout = {
  namespace: 'layout',
  init: function () {
    return {
      showingDrawer: false,
      showingBottomSheet: true
    }
  },
  showingDrawer: {
    toggle: function (state) {
      return !state
    }
  },
  showingBottomSheet: {
    toggle: function (state) {
      return !state
    },
    setTrue: function () {
      return true
    },
    setFalse: function () {
      return false
    }
  }
}

module.exports = layout
