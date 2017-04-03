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

  this.render = function () {
    const color = this.state.hasFocus
      ? 'b--red'
      : 'b--gray'

    return <div>
      <input
        type='text'
        onfocus={this.setFocus.bind(this, true)}
        onblur={this.setFocus.bind(this, false)}
        placeholder={props.placeholder || ''}
        className={css(styles.inputReset, styles.input, color)}
        oninput={props.oninput || Function.prototype}
      />
    </div>
  }
}

TextField.prototype = Object.create(Component.prototype)

TextField.prototype.setFocus = function (state) {
  this.setState({
    hasFocus: state
  })
}

TextField.prototype.componentWillMount = function () {
  this.state = {
    hasFocus: false
  }
}

module.exports = TextField
