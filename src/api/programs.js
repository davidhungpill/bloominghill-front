import { strapiGet, trackView } from './client'
import { programs as fallbackPrograms, getProgramById as staticById } from '../data/programs.js'

function formatDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

// Strapi v5: no .attributes wrapper; media fields are { url, ... } directly
function normalizeProgram(item) {
  return {
    id: item.documentId,
    badge: item.badge,
    badgeColor: item.badgeColor,
    category: item.category,
    title: item.title,
    detailTitle: item.detailTitle || item.title,
    desc: item.desc,
    date: formatDate(item.date),
    views: item.views,
    img: item.thumbnail?.url || '',
    contentImages: (item.contentImages || []).map(i => i.url),
  }
}

export async function fetchPrograms() {
  try {
    const { data } = await strapiGet('/programs?populate=thumbnail&sort=date:desc')
    return data.map(normalizeProgram)
  } catch {
    return fallbackPrograms
  }
}

export async function fetchProgramById(id) {
  try {
    const { data } = await strapiGet(`/programs/${id}?populate=*`)
    trackView('programs', data.documentId, data.views)
    return normalizeProgram(data)
  } catch {
    return staticById(id)
  }
}
