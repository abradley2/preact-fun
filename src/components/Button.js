/** @jsx h */
const h = require('preact').h

function Button (props) {
  return <button
    className='button-reset br2 bn ph3 pv2 bg-red white f4'
    onclick={props.onclick || Function.prototype}
  >
    {props.children}
  </button>
}

module.exports = Button
