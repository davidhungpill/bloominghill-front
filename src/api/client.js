const BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api'
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN || ''

 export async function strapiGet(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    })
    if (!res.ok) throw new Error(`Strapi ${path} → ${res.status}`)
    return res.json()
  }
