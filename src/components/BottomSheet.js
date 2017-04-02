/** @jsx h */
const h = require('preact').h
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

const styles = StyleSheet.create({
  bottomSheet: {
    transition: '1s',
    backgroundColor: 'white',
    height: '250px',
    marginBottom: '-255px',
    float: 'right',
    width: '100%',
    boxShadow: '2px 2px 4px 2px rgba( 0, 0, 0, 0.2 )'
  },
  bottomSheetShow: {
    marginBottom: '0px'
  }
})

function BottomSheet (props) {
  const layoutState = props.state.layout

  const bottomSheetClass = css(
    styles.bottomSheet,
    layoutState.showingBottomSheet && styles.bottomSheetShow
  )

  return <div className={bottomSheetClass}>
    <h3>Hello!</h3>
  </div>
}

module.exports = BottomSheet
