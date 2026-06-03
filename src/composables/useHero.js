import { ref, onMounted } from 'vue'
import { fetchSiteConfig, getHeroUrl } from '../api/siteConfig'

export function useHero(field) {
  const heroSrc = ref(null)
  onMounted(async () => {
    const config = await fetchSiteConfig()
    heroSrc.value = getHeroUrl(config, field)
  })
  return { heroSrc }
}
