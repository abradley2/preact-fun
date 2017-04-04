/** @jsx h */
const h = require('preact').h
const Component = require('preact').Component
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
  Component.call(this, props)
}

TextField.prototype = Object.create(Component.prototype)

TextField.prototype.render = function () {
  const props = this.props
  const color = this.state.hasFocus
    ? 'b--red'
    : 'b--gray'

  return <input
    type='text'
    value={this.props.value}
    onfocus={this.setFocus.bind(this, true)}
    placeholder={props.placeholder || ''}
    className={css(styles.inputReset, styles.input, color)}
    oninput={props.oninput}
  />
}

TextField.prototype.setFocus = function (state) {
  this.setState({
    hasFocus: state
  })
}

module.exports = TextField
