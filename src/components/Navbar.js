/** @jsx h */
const h = require('preact').h
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css
const colors = require('../styles/colors')

const drawerWidth = '250px'

const styles = StyleSheet.create({
  navbar: {
    transition: '1s',
    marginLeft: '-' + drawerWidth,
    backgroundColor: colors.coral,
    boxShadow: '2px 2px 4px 2px rgba( 0, 0, 0, 0.2 )',
    height: '4rem'
  },
  navbarShow: {
    marginLeft: '0px'
  },
  drawerWrapper: {
    width: drawerWidth
  },
  drawer: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    width: drawerWidth,
    backgroundColor: 'white',
    boxShadow: '2px 2px 4px 2px rgba( 0, 0, 0, 0.2 )'
  }
})

function topBar (props) {
  const dispatch = props.dispatch

  return <div className='pl3'>
    <div className='flex'>
      <div 
        className='dt pointer'
        onclick={toggleShowingDrawer}
      >
        <div className='h3 dtc v-mid white'>
          <span className='fa fa-3x fa-bars' />
        </div>
      </div>
    </div>
  </div>

  function toggleShowingDrawer () {
    dispatch({type: 'toggle layout.showingDrawer'})
  }
}

function drawer () {
  return <div className={css(styles.drawerWrapper)}>
    <div className={css(styles.drawer)}>
      <span>I am a drawer</span>
    </div>
  </div>
}

function navbar (props) {
  const layoutState = props.state.layout

  const navbarClass = css(
    styles.navbar,
    layoutState.showingDrawer && styles.navbarShow
  )

  return <div className={navbarClass}>
    <div className='absolute'>
      <div className='relative flex'>
        {drawer(props)}
        {topBar(props)}
      </div>
    </div>
  </div>
}

module.exports = navbar
