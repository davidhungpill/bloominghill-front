const BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api'
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN || ''

// BASE_URL 에서 /api 를 제거한 Strapi 호스트 (미디어 URL 절대경로 변환용)
const STRAPI_HOST = BASE_URL.replace(/\/api$/, '')

export function strapiMediaUrl(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${STRAPI_HOST}${url}`
}

export async function strapiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  })
  if (!res.ok) throw new Error(`Strapi ${path} → ${res.status}`)
  return res.json()
}
