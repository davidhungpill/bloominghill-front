import { strapiGet } from './client'

function normalizeItem(item) {
  return {
    id: item.documentId,
    title: item.title,
    image: item.image?.url || '',
    order: item.order ?? 0,
    target: item.target || '',
    targetSelection: item.targetSelection || '',
    content: item.content || '',
    period: item.period || '',
  }
}

export async function fetchBusinessPrograms(page) {
  try {
    const { data } = await strapiGet(
      `/business-programs?filters[page][$eq]=${page}&sort=order:asc&populate=image`
    )
    return data.map(normalizeItem)
  } catch {
    return []
  }
}
