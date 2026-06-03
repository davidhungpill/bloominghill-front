import { strapiGet } from './client'
import { stories as fallbackStories, getStoryById as staticById, getAdjacentStories as staticAdjacent } from '../data/stories.js'

function formatDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

// Strapi v5: no .attributes wrapper; media fields are { url, ... } directly
function normalizeStory(item) {
  return {
    id: item.id,
    category: item.category,
    title: item.title,
    desc: item.desc,
    content: item.content,
    quote: item.quote,
    date: formatDate(item.date),
    views: item.views,
    img: item.thumbnail?.url || '',
    images: (item.images || []).map(i => i.url),
    tags: item.tags || [],
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

export async function fetchStoryById(id) {
  try {
    const { data } = await strapiGet(`/stories/${id}?populate=thumbnail,images`)
    return normalizeStory(data)
  } catch {
    return staticById(id)
  }
}

export async function fetchAdjacentStories(id) {
  try {
    const { data } = await strapiGet('/stories?sort=date:desc&fields=id,title')
    const all = data.map(item => ({ id: item.id, title: item.title }))
    const idx = all.findIndex(s => s.id === Number(id))
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    }
  } catch {
    return staticAdjacent(id)
  }
}
