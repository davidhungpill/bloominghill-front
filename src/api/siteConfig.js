import { strapiGet } from './client'

const TEXT_FALLBACKS = {
  statOrchestra:   '128회',
  statScholarship: '542명',
  statDonation:    '15.2억',
  bankName:        '농협은행',
  accountNumber:   '301-1234-5678-01',
  accountHolder:   '사단법인 꽃재',
  phone:           '02-2299-5424',
  receiptEmail:    'blooming5424@naver.com',
  kakaoChannel:    '@꽃재복지재단',
  kakaoChannelUrl: '#',
}

const HERO_FALLBACKS = {
  heroIntro:      '/static/spring.jpg',
  heroOrchestra:  '/static/orch_main.jpg',
  heroNanum:      '/static/edu.jpg',
  heroScholarship:'/static/students.jpeg',
  heroStory:      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAZAFA2xBboGAIVypzB3t0QI1Gy5nqsWUeV6YliDb7JiVw8R-81zzZeNB20egNI4grq-kf3mHW_LE-xZCh90u37Jj_RrGOmNMnIWiIMwgAr_FgPuyezTa3TzEcg6VOqAC84nI0np8gCxk5GCoFc3ns93gTM2brYZ265z_iZ3h1OtTn42oArCA3Q3yguTGPk2-9vbOiztpGOzi2TCXRk1S6OKMCBjpiDjFNpZGfv2BkHrowsHQMaYEoYfI09YHzm6gC79c00BKAVKeM',
  heroPress:      '/static/press.jpg',
  heroEducation:  '/static/education.jpg',
  heroNotice:     '/static/notice.jpg',
  heroFaq:        '/static/notice.jpg',
  heroDonate:     '/static/spring2.jpg',
  heroDonateCert: '/static/spring.jpg',
}

let _cache = null
let _promise = null

export async function fetchSiteConfig() {
  if (_cache) return _cache
  if (_promise) return _promise
  _promise = strapiGet('/site-config?populate=*')
    .then(({ data }) => {
      // Strapi v5: Single Type returns data directly, no .attributes wrapper
      _cache = data || {}
      return _cache
    })
    .catch(() => {
      _cache = {}
      return _cache
    })
  return _promise
}

export function getHeroUrl(config, field) {
  // Strapi v5: media field is { url, ... } directly, not { data: { attributes: { url } } }
  return config?.[field]?.url || HERO_FALLBACKS[field] || ''
}

export function getSiteText(config, field) {
  return config?.[field] || TEXT_FALLBACKS[field] || ''
}
