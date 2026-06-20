import { strapiGet, strapiMediaUrl, trackView } from './client'

function formatDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

function normalizePost(item) {
  return {
    id: item.documentId,
    title: item.title,
    date: formatDate(item.date),
    img: strapiMediaUrl(item.thumbnail?.url) || '',
  }
}

const FALLBACK = [
  { id: 'c1', title: '봄 시즌 수제청 음료 소개', date: '2025.04.10', img: '' },
  { id: 'c2', title: '카페 마노아 5월 메뉴 업데이트', date: '2025.05.01', img: '' },
  { id: 'c3', title: '어버이날 특별 이벤트 안내', date: '2025.05.08', img: '' },
  { id: 'c4', title: '지역 주민과 함께한 바리스타 클래스', date: '2025.05.20', img: '' },
  { id: 'c5', title: '여름 음료 신메뉴 출시', date: '2025.06.05', img: '' },
  { id: 'c6', title: '카페 마노아 6월 소식', date: '2025.06.10', img: '' },
  { id: 'c7', title: '디저트 신메뉴 대추 스콘', date: '2025.06.15', img: '' },
  { id: 'c8', title: '6월 봉사 일정 안내', date: '2025.06.20', img: '' },
]

function normalizePostDetail(item) {
  return {
    id: item.documentId,
    title: item.title,
    date: formatDate(item.date),
    views: item.views || 0,
    img: strapiMediaUrl(item.thumbnail?.url) || '',
    desc: item.desc || '',
    contentImages: (item.contentImages || []).map(i => strapiMediaUrl(i.url)),
  }
}

const FALLBACK_DETAIL = {
  c1: { id: 'c1', title: '봄 시즌 수제청 음료 소개', date: '2025.04.10', views: 0, img: '', desc: '', contentImages: [] },
}

export async function fetchCafePostById(id) {
  try {
    const { data } = await strapiGet(`/cafe-posts/${id}?populate=*`)
    trackView('cafe-posts', data.documentId, data.views)
    return normalizePostDetail(data)
  } catch {
    if (!import.meta.env.DEV) return null
    return FALLBACK_DETAIL[id] ?? null
  }
}

export async function fetchCafePosts() {
  try {
    const { data } = await strapiGet('/cafe-posts?sort=date:desc&pagination[pageSize]=100&populate=thumbnail')
    return data.map(normalizePost)
  } catch {
    return import.meta.env.DEV ? FALLBACK : []
  }
}
