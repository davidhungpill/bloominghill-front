import { strapiGet } from './client'
import { blocksToHtml } from '../utils/blocksToHtml'

function formatDate(d) {
  return d ? d.replace(/-/g, '.') : ''
}

const FALLBACK = [
  { id: 100, isNotice: true,  title: '[안내] 2024년 결산 공고 및 지정기부금 단체 실적 공시', date: '2024.03.15' },
  { id: 99,  isNotice: true,  title: '[공지] 제5회 정기연주회 관람 신청 안내 (무료 공연)', date: '2024.03.02' },
  { id: 8,   isNotice: false, title: '꽃재 나눔 릴레이 캠페인 참여 안내', date: '2024.02.28' },
  { id: 7,   isNotice: false, title: '2024년 상반기 장학생 선발 안내', date: '2024.02.15' },
  { id: 6,   isNotice: false, title: '자원봉사자 모집: 지역아동센터 음악 교육 지원', date: '2024.02.10' },
  { id: 5,   isNotice: false, title: '설 연휴 사무국 휴무 및 운영 안내', date: '2024.02.05' },
  { id: 4,   isNotice: false, title: '2023년 하반기 사업보고서 공시 안내', date: '2023.12.20' },
  { id: 3,   isNotice: false, title: '꽃재 바자회 수익금 전달식 개최 안내', date: '2023.11.15' },
  { id: 2,   isNotice: false, title: '2023년 정기총회 개최 공고', date: '2023.10.30' },
  { id: 1,   isNotice: false, title: '사단법인 꽃재 홈페이지 개편 안내', date: '2023.09.01' },
]

const FALLBACK_DETAILS = {
  100: {
    id: 100,
    isNotice: true,
    title: '[안내] 2024년 결산 공고 및 지정기부금 단체 실적 공시',
    date: '2024.03.15',
    views: 1248,
    body: `
      <p>안녕하세요, 사단법인 꽃재(Blooming Hill)입니다.</p>
      <p>항상 꽃재 재단과 함께해주시는 후원자 여러분과 지역사회 구성원분들께 깊은 감사의 인사를 드립니다. 저희 재단은 정직하고 투명한 운영을 최우선 가치로 삼고 있으며, 관련 법령에 의거하여 2024년도 재무 결산 내역 및 지정기부금 활용 실적을 다음과 같이 공시합니다.</p>
      <div class="py-4">
        <h3 class="font-headline-md text-headline-md text-on-surface mb-6">공시 개요</h3>
        <ul class="space-y-4">
          <li class="flex items-start gap-4"><span class="font-bold text-on-surface min-w-[120px]">1. 공시항목</span><span>2024년도 재무제표 및 지정기부금 수입/지출 내역</span></li>
          <li class="flex items-start gap-4"><span class="font-bold text-on-surface min-w-[120px]">2. 관련근거</span><span>상속세 및 증여세법 제50조의3, 소득세법 제34조</span></li>
          <li class="flex items-start gap-4"><span class="font-bold text-on-surface min-w-[120px]">3. 공고장소</span><span>사단법인 꽃재 홈페이지 및 국세청 홈택스</span></li>
        </ul>
      </div>
      <p>꽃재는 후원자님의 소중한 기부금이 소외된 이웃의 자립과 성장을 위해 가장 효율적으로 사용될 수 있도록 최선을 다하고 있습니다.</p>
      <p>감사합니다.</p>
    `,
    attachments: [
      { name: '2024_결산공고_최종.pdf', size: '1.2MB', icon: 'description', url: '#' },
      { name: '2024_기부금실적공시_보고서.pdf', size: '850KB', icon: 'description', url: '#' },
    ],
  },
}

export async function fetchNotices() {
  try {
    const { data } = await strapiGet('/notices?sort=isPinned:desc,date:desc')
    return data.map(item => ({
      id: item.documentId,
      isNotice: item.isPinned,
      title: item.title,
      date: formatDate(item.date),
    }))
  } catch {
    return FALLBACK
  }
}

export async function fetchNoticeById(id) {
  try {
    const { data } = await strapiGet(`/notices/${id}?populate=attachments`)
    return {
      id: data.documentId,
      isNotice: data.isPinned,
      title: data.title,
      date: formatDate(data.date),
      views: data.views || 0,
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
    const basic = FALLBACK.find(n => n.id === Number(id))
    return basic ? { ...basic, views: 0, body: '', attachments: [] } : null
  }
}

export async function fetchAdjacentNotices(id) {
  try {
    const { data } = await strapiGet('/notices?sort=isPinned:desc,date:desc&fields=id,title')
    const all = data.map(item => ({ id: item.documentId, title: item.title }))
    const idx = all.findIndex(n => n.id === id)
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    }
  } catch {
    const all = FALLBACK.map(n => ({ id: n.id, title: n.title }))
    const idx = all.findIndex(n => n.id === Number(id))
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
