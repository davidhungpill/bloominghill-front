import { strapiGet, strapiMediaUrl } from './client'
import { blocksToHtml } from '../utils/blocksToHtml'

function formatDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

const TYPE_COLORS = {
  '보도': 'text-leaf-green',
  '뉴스': 'text-sky-blue',
  '언론': 'text-warm-accent',
}

const FALLBACK = [
  { id: 125, type: '보도', title: "꽃재, 취약계층 겨울나기 '따뜻한 방학' 지원 성료", date: '2024.11.20' },
  { id: 124, type: '뉴스', title: '사단법인 꽃재, 제15회 정기연주회 성황리 개최', date: '2024.11.05' },
  { id: 123, type: '언론', title: '꽃재 장학금 전달식, 지역 인재 육성에 앞장', date: '2024.10.25' },
  { id: 122, type: '보도', title: "Blooming Hill, '함께하는 나눔' 바자회 수익금 전액 기부", date: '2024.10.10' },
  { id: 121, type: '뉴스', title: '꽃재-성동구청, 지역사회 복지 증진을 위한 MOU 체결', date: '2024.09.28' },
  { id: 120, type: '보도', title: "'꿈꾸는 숲' 1기 수료식 진행... 아동 정서 지원 강화", date: '2024.09.15' },
  { id: 119, type: '언론', title: '꽃재 다문화오케스트라, 어르신 위문 공연 호평', date: '2024.08.30' },
  { id: 118, type: '뉴스', title: '여름방학 청소년 봉사 캠프 성황... 200명 참여', date: '2024.08.12' },
  { id: 117, type: '보도', title: '꽃재, 취약계층 여름방학 급식 지원 사업 실시', date: '2024.07.25' },
  { id: 116, type: '언론', title: '사단법인 꽃재, 창립 10주년 기념 행사 개최', date: '2024.07.10' },
].map(item => ({ ...item, typeColor: TYPE_COLORS[item.type] }))

const FALLBACK_DETAILS = {
  125: {
    id: 125,
    type: '보도',
    typeColor: 'text-leaf-green',
    title: "꽃재, 취약계층 겨울나기 '따뜻한 방학' 지원 성료",
    date: '2024.11.20',
    views: 1248,
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKcpAIKXfTsEBgvT8d2NVg2Mbbeto1QXPur2s8oHvufRHKiXnu-Xyz_YpUoAsANB37n2BMeuGl6qa96L4jRRL9Sdi-wM7ZXoUDaY-v9O2tp0RTl6DooRVr4JpDCWgU3xm27ki-yG6UK6RjKKaKraRdH22nRBbK5f4kA3NFLIJD4kR0tA271BjnzQuptXvw6CnKinaN7PJrIKfSnG6JITPKdTPXDFkmKlQBxJ7aPo3JIk4rpReQirPrTDmGmNXfPqg-_UiuCT-aMGHG',
    body: `
      <p>사단법인 꽃재는 지난 15일, 다가오는 동절기를 맞아 지역 사회 내 에너지 취약계층 200가구를 대상으로 진행한 '따뜻한 방학' 겨울나기 지원 사업을 성공적으로 마무리했다고 밝혔습니다.</p>
      <p>이번 지원 사업은 경제적 어려움으로 인해 난방비 부담이 큰 홀몸 어르신과 조손 가정을 중점적으로 지원하기 위해 기획되었습니다.</p>
      <p>사단법인 꽃재는 지속 가능한 복지 생태계 구축을 목표로 교육 지원, 의료 지원, 주거 환경 개선 등 다양한 사회공헌 사업을 전개하고 있습니다.</p>
    `,
    attachments: [
      { name: '2024_겨울나기_지원사업_보도자료.pdf', size: '2.4MB', icon: 'picture_as_pdf', url: '#' },
      { name: '현장사진_모음.zip', size: '45.8MB', icon: 'folder_zip', url: '#' },
    ],
  },
}

export async function fetchPressArticles() {
  try {
    const { data } = await strapiGet('/press-articles?sort=date:desc&populate=featuredImage')
    return data.map(item => ({
      id: item.documentId,
      type: item.type,
      typeColor: TYPE_COLORS[item.type] || 'text-on-surface',
      title: item.title,
      date: formatDate(item.date),
      featuredImage: strapiMediaUrl(item.featuredImage?.url),
    }))
  } catch {
    return FALLBACK
  }
}

export async function fetchPressArticleById(id) {
  try {
    const { data } = await strapiGet(`/press-articles/${id}?populate=*`)
    // Strapi v5: fields directly on data, media as { url, ... } not { data: { attributes: { url } } }
    return {
      id: data.documentId,
      type: data.type,
      typeColor: TYPE_COLORS[data.type] || 'text-on-surface',
      title: data.title,
      date: formatDate(data.date),
      views: data.views || 0,
      featuredImage: strapiMediaUrl(data.featuredImage?.url),
      body: blocksToHtml(data.body),
      attachments: (data.attachments || []).map(f => ({
        name: f.name,
        size: formatFileSize(f.size),
        url: f.url,
        icon: getFileIcon(f.mime),
      })),
    }
  } catch {
    const detail = FALLBACK_DETAILS[Number(id)]
    if (detail) return detail
    const basic = FALLBACK.find(p => p.id === Number(id))
    return basic ? { ...basic, views: 0, featuredImage: null, body: '', attachments: [] } : null
  }
}

export async function fetchAdjacentPressArticles(id) {
  try {
    const { data } = await strapiGet('/press-articles?sort=date:desc&fields=documentId,title')
    const all = data.map(item => ({ id: item.documentId, title: item.title }))
    const idx = all.findIndex(p => String(p.id) === String(id))
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    }
  } catch {
    const all = FALLBACK.map(p => ({ id: p.id, title: p.title }))
    const idx = all.findIndex(p => p.id === Number(id))
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    }
  }
}

function formatFileSize(kb) {
  if (!kb) return ''
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)}MB` : `${kb}KB`
}

function getFileIcon(mime) {
  if (!mime) return 'description'
  if (mime.includes('pdf')) return 'picture_as_pdf'
  if (mime.includes('zip') || mime.includes('compressed')) return 'folder_zip'
  if (mime.startsWith('image/')) return 'image'
  return 'description'
}
