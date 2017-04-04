/** @jsx h */
const h = require('preact').h
const StyleSheet = require('aphrodite').StyleSheet
const css = require('aphrodite').css

const styles = StyleSheet.create({
  inputReset: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none'
  },
  input: 'transition h2 f3 bb bw1'
})

function TextField (props) {
  return <input
    type='text'
    value={props.value}
    placeholder={props.placeholder || ''}
    className={css(styles.inputReset, styles.input)}
    oninput={props.oninput}
  />
}

module.exports = TextField
