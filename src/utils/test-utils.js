require('undom/register')
require('./test-mocks')
const cheerio = require('cheerio')

function getSelector (element) {
  const html = serialize(element)
  console.log('html = ', html)
  return cheerio.load(html)
}

// need to NoOp aphrodite in a test environment
Object.assign(require('aphrodite'), {
  StyleSheet: {create: function () { return {} }},
  css: function () { return '' }
})

function serialize (el) {
  if (el.nodeType === 3) return el.textContent
  var name = String(el.nodeName).toLowerCase()
  var str = '<' + name
  var c
  var i
  for (i = 0; i < el.attributes.length; i++) {
    str += ' ' + el.attributes[i].name + '="' + el.attributes[i].value + '"'
  }
  str += '>'
  for (i = 0; i < el.childNodes.length; i++) {
    c = serialize(el.childNodes[i])
    if (c) str += '\n\t' + c.replace(/\n/g, '\n\t')
  }
  return str + (c ? '\n' : '') + '</' + name + '>'
}

module.exports = {
  getSelector
}
