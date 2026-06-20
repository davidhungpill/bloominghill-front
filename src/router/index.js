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
  { path: '/cafe', component: () => import('../views/CafeView.vue') },
  { path: '/cafe/:id', component: () => import('../views/CafeDetailView.vue') },
  { path: '/nanum', component: () => import('../views/NanumView.vue') },
  { path: '/scholarship', component: () => import('../views/ScholarshipView.vue') },
  { path: '/story', component: () => import('../views/NanumStoryView.vue') },
  { path: '/story/:id', component: () => import('../views/NanumStoryDetailView.vue') },
  { path: '/press', component: () => import('../views/PressBoardView.vue') },
  { path: '/press/:id', component: () => import('../views/PressDetailView.vue') },
  { path: '/education', component: () => import('../views/EducationView.vue') },
  { path: '/education/:id', component: () => import('../views/EducationDetailView.vue') },
  { path: '/notice', component: () => import('../views/NoticeBoardView.vue') },
  { path: '/notice/:id', component: () => import('../views/NoticeDetailView.vue') },
  { path: '/faq', component: () => import('../views/FaqView.vue') },
  { path: '/donate', component: () => import('../views/DonateView.vue') },
  { path: '/donate-cert', component: () => import('../views/DonateCertView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 160 }
    return { top: 0 }
  },
})
