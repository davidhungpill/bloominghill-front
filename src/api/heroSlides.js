import { strapiGet } from './client'

const FALLBACK_SLIDES = [
  { src: '/static/orchestra.jpg', alt: '꽃재 오케스트라' },
  { src: '/static/spring2.jpg',   alt: '꽃재 봄 활동' },
  { src: '/static/edu.jpg',       alt: '꽃재 교육 사업' },
  { src: '/static/cleaning.jpg',  alt: '꽃재 봉사 활동' },
]

export async function fetchHeroSlides() {
  try {
    const { data } = await strapiGet(
      '/hero-slides?filters[isActive][$ne]=false&sort=order:asc&populate=image'
    )
    // Strapi v5: no .attributes wrapper; media field is { url, ... } directly
    const slides = data
      .map(item => ({
        src: item.image?.url || '',
        alt: item.alt || '',
      }))
      .filter(s => s.src)
    return slides.length ? slides : (import.meta.env.DEV ? FALLBACK_SLIDES : [])
  } catch {
    return import.meta.env.DEV ? FALLBACK_SLIDES : []
  }
}
