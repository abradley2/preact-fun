/** @jsx h */
const h = require('preact').h
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

const styles = StyleSheet.create({
  bottomSheet: {
    transition: '1s',
    backgroundColor: 'white',
    height: '250px',
    margin: '0px 0px -255px 0px',
    float: 'right',
    width: '100%',
    boxShadow: '2px 2px 4px 2px rgba( 0, 0, 0, 0.2 )'
  },
  bottomSheetShow: {
    margin: '-50px 0px 0px 0px'
  }
})

function BottomSheet (props) {
  const layoutState = props.state.layout

  const bottomSheetClass = css(
    styles.bottomSheet,
    layoutState.showingBottomSheet && styles.bottomSheetShow
  )

  return <div className={bottomSheetClass}>
    {props.children}
  </div>
}

module.exports = BottomSheet
