/** @jsx h */
const h = require('preact').h
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

const styles = StyleSheet.create({
  dtc: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }
})

function FloatingAction (props) {
  return <div
    className='dt tc'
    onclick={props.onclick || Function.prototype}
  >
    <i
      className={
        css(styles.dtc) +
        ' shadow-2 br-100 h3 w3 bg-red white fa fa-3x ' +
        (props.iconClass || 'fa-plus')
      } />
  </div>
}

module.exports = FloatingAction
