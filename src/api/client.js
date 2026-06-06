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

export async function strapiPut(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Strapi PUT ${path} → ${res.status}`)
  return res.json()
}

/**
 * 상세 페이지 조회수 증가.
 * - 같은 브라우저 세션에서 동일 게시물 재방문 시 카운트 안 함 (sessionStorage 기반)
 * - PUT 실패 시 개발 환경에서만 콘솔 경고 출력 (권한 미설정 시 확인 용도)
 */
export function trackView(contentType, documentId, currentViews) {
  const key = `view:${contentType}:${documentId}`
  if (sessionStorage.getItem(key)) return
  sessionStorage.setItem(key, '1')
  strapiPut(`/${contentType}/${documentId}`, { data: { views: (currentViews || 0) + 1 } })
    .catch(err => {
      sessionStorage.removeItem(key) // 실패 시 다음 방문에서 재시도
      if (import.meta.env.DEV) {
        console.warn(`[views] ${contentType}/${documentId} 조회수 증가 실패:`, err.message)
        console.info('[views] Strapi 관리자 → Settings → API Tokens → update 권한 확인 필요')
      }
    })
}
