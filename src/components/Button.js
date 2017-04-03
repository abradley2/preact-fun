/** @jsx h */
const h = require('preact').h

function Button (props) {
  return <button
    className='button-reset'
    onclick={props.onclick || Function.prototype}
  >
    {props.children}
  </button>
}

module.exports = Button
