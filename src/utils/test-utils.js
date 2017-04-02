const css = require('cssauron')({
  id: 'id',
  'class': 'className',
  parent: 'parentNode',
  tag: function (node) { return (node.tagName || node.nodeName || '').toLowerCase() },
  contents: function (node) { return node.innerText || node.textContent || '' },
  children: function (node) {
    if (node.children) {
      return node.children
    }

    var out = []
    for (var i = 0, len = node.childNodes.length; i < len; ++i) {
      if (node.childNodes[i].tagName) out.push(node.childNodes[i])
    }
    return out
  },
  attr: function (node, attr) { return node.getAttribute(attr) }
})
const walk = require('dom-walk')

function getSelector (query) {
  const selector = css(query)
  return function check (element) {
    if (check.found) return
    check.found = selector(element)
  }
}

function find (queries, dom) {
  const selectors = (Array.isArray(queries) ? queries : [queries]).map(getSelector)
  walk(dom, function (current) {
    for (var i = 0; i < selectors.length; i++) {
      if (current.getAttribute) selectors[i](current)
    }
  })

  return selectors.map(s => s.found)
}

// need to NoOp aprhodite
Object.assign(require('aphrodite'), {
  StyleSheet: {create: function () { return {} }},
  css: function () { return '' }
})

module.exports = {
  getSelector,
  find
}
