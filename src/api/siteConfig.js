import { strapiGet } from './client'

const HERO_FALLBACKS = {
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
  const fields = Object.keys(HERO_FALLBACKS).join(',')
  _promise = strapiGet(`/site-config?populate=${fields}`)
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
