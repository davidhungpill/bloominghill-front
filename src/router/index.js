import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/intro', component: () => import('../views/IntroView.vue') },
  { path: '/missions', component: () => import('../views/MissionsView.vue') },
  { path: '/organization', component: () => import('../views/OrganizationView.vue') },
  { path: '/facility', component: () => import('../views/FacilityView.vue') },
  { path: '/history', component: () => import('../views/HistoryView.vue') },
  { path: '/location', component: () => import('../views/LocationView.vue') },
  { path: '/orchestra', component: () => import('../views/OrchestraView.vue') },
  { path: '/nanum', component: () => import('../views/NanumView.vue') },
  { path: '/scholarship', component: () => import('../views/ScholarshipView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 160 }
    return { top: 0 }
  },
})
