/** @jsx h */
const h = require('preact').h

function FloatingAction (props) {
  return <div
    className='dt tc'
    onclick={props.onclick || Function.prototype}
  >
    <i
      className={
        'fa fa-3x dtc v-mid shadow-2 br-100 h3 w3 bg-red white ' +
        (props.iconClass || 'fa-plus')
      } />
  </div>
}

module.exports = FloatingAction
