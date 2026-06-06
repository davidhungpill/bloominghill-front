import { strapiGet } from './client'
import { stories as fallbackStories, getStoryById as staticById, getAdjacentStories as staticAdjacent } from '../data/stories.js'

function formatDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

// Strapi v5 Rich Text Blocks → HTML string
function blocksToHtml(blocks) {
  if (!blocks) return ''
  if (!Array.isArray(blocks)) return String(blocks) // already plain text (fallback)

  return blocks.map(block => {
    const inlineHtml = (children = []) => children.map(child => {
      if (child.type === 'link') {
        const inner = inlineHtml(child.children)
        return `<a href="${child.url}" target="_blank" rel="noopener">${inner}</a>`
      }
      let t = child.text || ''
      if (child.bold)          t = `<strong>${t}</strong>`
      if (child.italic)        t = `<em>${t}</em>`
      if (child.underline)     t = `<u>${t}</u>`
      if (child.strikethrough) t = `<s>${t}</s>`
      if (child.code)          t = `<code>${t}</code>`
      return t
    }).join('')

    switch (block.type) {
      case 'paragraph':
        return `<p>${inlineHtml(block.children)}</p>`
      case 'heading':
        return `<h${block.level}>${inlineHtml(block.children)}</h${block.level}>`
      case 'list': {
        const items = (block.children || []).map(li => `<li>${inlineHtml(li.children)}</li>`).join('')
        return block.format === 'ordered' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`
      }
      case 'quote':
        return `<blockquote>${inlineHtml(block.children)}</blockquote>`
      case 'code':
        return `<pre><code>${inlineHtml(block.children)}</code></pre>`
      default:
        return `<p>${inlineHtml(block.children)}</p>`
    }
  }).join('\n')
}

// Strapi v5: no .attributes wrapper; media fields are { url, ... } directly
function normalizeStory(item) {
  // Strapi JSON 필드가 { "tags": [...] } 형태로 중첩될 수 있어 .tags 우선 참조
  const rawField = item.tags
  const raw = Array.isArray(rawField) ? rawField : (rawField?.tags ?? rawField)
  let tags = []
  if (Array.isArray(raw)) {
    tags = raw
  } else if (typeof raw === 'string' && raw.trim()) {
    try { tags = JSON.parse(raw) } catch { tags = [] }
  }

  return {
    id: item.documentId,
    category: item.category,
    title: item.title,
    desc: item.desc,
    content: blocksToHtml(item.content),
    quote: item.quote,
    date: formatDate(item.date),
    views: item.views,
    img: item.thumbnail?.url || '',
    images: (item.images || []).map(i => i.url),
    tags,
  }
}

export async function fetchStories() {
  try {
    const { data } = await strapiGet('/stories?populate=thumbnail&sort=date:desc')
    return data.map(normalizeStory)
  } catch {
    return fallbackStories
  }
}

const PAGE_SIZE = 9

export async function fetchStoriesPage(page = 1) {
  try {
    const { data, meta } = await strapiGet(
      `/stories?populate=thumbnail&sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`
    )
    return {
      stories: data.map(normalizeStory),
      pagination: meta.pagination, // { page, pageSize, pageCount, total }
    }
  } catch {
    const total     = fallbackStories.length
    const pageCount = Math.ceil(total / PAGE_SIZE)
    const start     = (page - 1) * PAGE_SIZE
    return {
      stories: fallbackStories.slice(start, start + PAGE_SIZE),
      pagination: { page, pageSize: PAGE_SIZE, pageCount, total },
    }
  }
}

export async function fetchStoryById(id) {
  try {
    const { data } = await strapiGet(`/stories/${id}?populate=*`)
    return normalizeStory(data)
  } catch {
    return staticById(id)
  }
}

export async function fetchAdjacentStories(id) {
  try {
    const { data } = await strapiGet('/stories?sort=date:desc&fields=id,title')
    const all = data.map(item => ({ id: item.documentId, title: item.title }))
    const idx = all.findIndex(s => s.id === id)
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    }
  } catch {
    return staticAdjacent(id)
  }
}
