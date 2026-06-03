/**
 * Converts Strapi v5 Rich Text (Blocks) JSON to an HTML string.
 * Falls through gracefully if the value is already a string (Long text).
 */
export function blocksToHtml(blocks) {
  if (!blocks) return ''
  if (typeof blocks === 'string') return blocks
  if (!Array.isArray(blocks)) return ''
  return blocks.map(blockToHtml).join('')
}

function blockToHtml(block) {
  switch (block.type) {
    case 'paragraph':
      return `<p>${inlineToHtml(block.children)}</p>`
    case 'heading':
      return `<h${block.level}>${inlineToHtml(block.children)}</h${block.level}>`
    case 'list': {
      const tag = block.format === 'ordered' ? 'ol' : 'ul'
      const items = (block.children || [])
        .map(item => `<li>${inlineToHtml(item.children)}</li>`)
        .join('')
      return `<${tag}>${items}</${tag}>`
    }
    case 'quote':
      return `<blockquote>${inlineToHtml(block.children)}</blockquote>`
    case 'code':
      return `<pre><code>${inlineToHtml(block.children)}</code></pre>`
    case 'image': {
      const url = block.image?.url || ''
      const alt = block.image?.alternativeText || ''
      return url ? `<img src="${url}" alt="${alt}" class="w-full h-auto rounded" />` : ''
    }
    default:
      return inlineToHtml(block.children || [])
  }
}

function inlineToHtml(children) {
  if (!children) return ''
  return children.map(child => {
    if (child.type === 'link') {
      return `<a href="${child.url}" class="text-primary hover:underline">${inlineToHtml(child.children)}</a>`
    }
    let text = escapeHtml(child.text || '')
    if (child.bold)          text = `<strong>${text}</strong>`
    if (child.italic)        text = `<em>${text}</em>`
    if (child.underline)     text = `<u>${text}</u>`
    if (child.strikethrough) text = `<s>${text}</s>`
    if (child.code)          text = `<code class="bg-surface-dim px-1 rounded text-sm">${text}</code>`
    return text
  }).join('')
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
