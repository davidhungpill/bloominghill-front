import { strapiGet } from './client'

export async function fetchHeroSlides() {
  try {
    const { data } = await strapiGet(
      '/hero-slides?filters[isActive][$ne]=false&sort=order:asc&populate=image'
    )
    return data
      .map(item => ({
        src: item.image?.url || '',
        alt: item.alt || '',
      }))
      .filter(s => s.src)
  } catch {
    return []
  }
}
