/** @jsx h */
const h = require('preact').h
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css
const colors = require('../styles/colors')

const drawerWidth = '250px'

const styles = StyleSheet.create({
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
  },
  navbar: {
    backgroundColor: colors.coral,
    boxShadow: '2px 2px 4px 2px rgba( 0, 0, 0, 0.2 )',
    height: '60px'
  }
})

function iconGroup () {

}

function topBar () {
  return <div className={css(styles.topBarWrapper)}>
    <div className={css(styles.topBar)}>
      <h3>I am the top bar</h3>
    </div>
  </div>
}

function drawer () {
  return <div className={css(styles.drawerWrapper)}>
    <div className={css(styles.drawer)}>
      <span>I am a drawer</span>
    </div>
  </div>
}

function navbar () {
  return <div className={css(styles.navbar)}>
    <div className='absolute'>
      <div className='relative flex'>
        {drawer()}
        {topBar()}
      </div>
    </div>
  </div>
}

module.exports = navbar
