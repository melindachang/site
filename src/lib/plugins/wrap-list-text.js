import { visit } from 'unist-util-visit'

const blockTags = new Set([
  'p',
  'pre',
  'blockquote',
  'div',
  'ul',
  'ol',
  'li',
  'table',
  'section',
  'article',
])

export default function wrapListText() {
  return tree => {
    visit(tree, 'element', node => {
      if (node.tagName === 'li' && Array.isArray(node.children)) {
        const newChildren = []
        let inlineGroup = []

        function flush() {
          const filtered = inlineGroup.filter(
            node =>
              node.type !== 'text' ||
              (node.value && node.value.trim().length > 0),
          )

          if (filtered.length > 0) {
            newChildren.push({
              type: 'element',
              tagName: 'p',
              properties: {},
              children: filtered,
            })
          }
          inlineGroup = []
        }

        node.children.forEach(child => {
          if (child.type === 'element' && blockTags.has(child.tagName)) {
            flush()
            newChildren.push(child)
          } else {
            inlineGroup.push(child)
          }
        })

        flush()

        node.children = newChildren
      }
    })
  }
}
