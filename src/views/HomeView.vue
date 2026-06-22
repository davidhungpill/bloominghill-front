<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-[#1c3018]">
      <div class="absolute inset-0 z-0">
        <!-- 로딩 스켈레톤 -->
        <div
          v-if="!heroImages.length"
          class="absolute inset-0 hero-skeleton"
        ></div>
        <!-- 슬라이드 이미지 -->
        <img
          v-for="(img, i) in heroImages"
          :key="img.src"
          :src="img.src"
          :alt="img.alt"
          :fetchpriority="i === 0 ? 'high' : 'low'"
          :loading="i === 0 ? 'eager' : 'lazy'"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
        />
        <div v-if="heroImages.length" class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
      </div>

      <!-- 좌/우 화살표 -->
      <button
        class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all active:scale-90"
        @click="prevSlide"
      >
        <span class="material-symbols-outlined text-3xl">chevron_left</span>
      </button>
      <button
        class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all active:scale-90"
        @click="nextSlideManual"
      >
        <span class="material-symbols-outlined text-3xl">chevron_right</span>
      </button>

      <!-- dot 인디케이터 -->
      <div class="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        <button
          v-for="(_, i) in heroImages"
          :key="i"
          class="rounded-full transition-all duration-300"
          :class="i === currentSlide
            ? 'w-6 h-2 bg-white'
            : 'w-2 h-2 bg-white/50 hover:bg-white/80'"
          @click="goToSlide(i)"
        ></button>
      </div>
      <div class="relative z-10 w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto text-white">
        <div class="max-w-2xl">
          <span class="inline-block px-4 py-1.5 rounded-full bg-leaf-green/90 text-white font-label-sm text-label-sm mb-6 uppercase tracking-wider">
            Blooming Hill Foundation
          </span>
          <h1 class="font-headline-xl text-headline-xl mb-6 leading-tight">
            세상을 꽃피우는<br/>따뜻한 울림, 사단법인 꽃재
          </h1>
          <p class="font-body-lg text-body-lg mb-10 text-white/90">
            우리는 음악과 나눔을 통해 지역사회의 소외된 이웃들에게 <br class="hidden md:block"/>
            희망의 꽃을 피우는 사회복지법인 꽃재입니다.
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link to="/donate" class="px-8 py-4 bg-warm-accent rounded-xl font-headline-md text-white hover:shadow-lg transition-all hover:scale-105 active:scale-95">
              지금 후원하기
            </router-link>
            <router-link to="/intro" class="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white rounded-xl font-headline-md text-white hover:bg-white/20 transition-all active:scale-95">
              재단 소개
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="relative z-20 -mt-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="glass-card soft-shadow p-8 rounded-2xl text-center hover-lift border-b-4 border-leaf-green">
          <span class="material-symbols-outlined text-leaf-green text-4xl mb-4">music_note</span>
          <div class="text-3xl font-headline-xl text-primary mb-1">{{ stats.statOrchestra }}</div>
          <p class="font-label-sm text-on-surface-variant">오케스트라 정기공연</p>
        </div>
        <div class="glass-card soft-shadow p-8 rounded-2xl text-center hover-lift border-b-4 border-sky-blue">
          <span class="material-symbols-outlined text-sky-blue text-4xl mb-4">school</span>
          <div class="text-3xl font-headline-xl text-primary mb-1">{{ stats.statScholarship }}</div>
          <p class="font-label-sm text-on-surface-variant">장학생 누적 지원</p>
        </div>
        <div class="glass-card soft-shadow p-8 rounded-2xl text-center hover-lift border-b-4 border-warm-accent">
          <span class="material-symbols-outlined text-warm-accent text-4xl mb-4">volunteer_activism</span>
          <div class="text-3xl font-headline-xl text-primary mb-1">{{ stats.statDonation }}</div>
          <p class="font-label-sm text-on-surface-variant">나눔 사업 누적 기부</p>
        </div>
        <div class="bg-primary p-8 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg hover-lift">
          <p class="text-white/80 font-label-sm mb-4">함께 만드는 변화</p>
          <router-link to="/donate" class="w-full bg-white text-primary font-headline-md py-3 rounded-lg flex items-center justify-center gap-2">
            후원하기 <span class="material-symbols-outlined">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Core Projects -->
    <section class="py-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div class="text-center mb-16">
        <h2 class="font-headline-xl text-headline-xl text-on-surface mb-4">법인의 핵심 사업</h2>
        <p class="text-on-surface-variant font-body-lg max-w-2xl mx-auto">더 나은 세상을 위해 꽃재가 앞장서서 실천하는 아름다운 나눔의 가치들입니다.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <router-link to="/orchestra" class="group bg-white rounded-2xl overflow-hidden soft-shadow hover-lift border border-outline-variant/10 block">
          <div class="h-64 overflow-hidden relative">
            <img
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              :src="projectImages.orchestra"
              alt="오케스트라"
            />
            <div class="absolute top-4 left-4">
              <span class="bg-leaf-green text-white px-4 py-1 rounded-full font-label-sm text-label-sm">대표 사업</span>
            </div>
          </div>
          <div class="p-8">
            <h3 class="font-headline-lg text-headline-lg mb-3">오케스트라</h3>
            <p class="text-on-surface-variant mb-6 font-body-md">문화예술 교육을 통해 청소년들의 꿈을 키우고, 음악으로 지역사회에 힐링을 선사합니다.</p>
            <span class="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              자세히 보기 <span class="material-symbols-outlined">chevron_right</span>
            </span>
          </div>
        </router-link>

        <router-link to="/nanum" class="group bg-white rounded-2xl overflow-hidden soft-shadow hover-lift border border-outline-variant/10 block">
          <div class="h-64 overflow-hidden relative">
            <img
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              :src="projectImages.nanum"
              alt="이웃사랑 나눔사업"
            />
            <div class="absolute top-4 left-4">
              <span class="bg-leaf-green text-white px-4 py-1 rounded-full font-label-sm text-label-sm">나눔의 실천</span>
            </div>
          </div>
          <div class="p-8">
            <h3 class="font-headline-lg text-headline-lg mb-3">이웃사랑 나눔사업</h3>
            <p class="text-on-surface-variant mb-6 font-body-md">기초수급자 및 복지 사각지대의 이웃들에게 생활 필수품과 긴급 생계비를 지원합니다.</p>
            <span class="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              자세히 보기 <span class="material-symbols-outlined">chevron_right</span>
            </span>
          </div>
        </router-link>

        <router-link to="/scholarship" class="group bg-white rounded-2xl overflow-hidden soft-shadow hover-lift border border-outline-variant/10 block">
          <div class="h-64 overflow-hidden relative">
            <img
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              :src="projectImages.scholarship"
              alt="장학 사업"
            />
            <div class="absolute top-4 left-4">
              <span class="bg-leaf-green text-white px-4 py-1 rounded-full font-label-sm text-label-sm">인재 육성</span>
            </div>
          </div>
          <div class="p-8">
            <h3 class="font-headline-lg text-headline-lg mb-3">장학 사업</h3>
            <p class="text-on-surface-variant mb-6 font-body-md">경제적 어려움 속에서도 꿈을 잃지 않는 인재들을 발굴하여 학업에 전념할 수 있도록 돕습니다.</p>
            <span class="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              자세히 보기 <span class="material-symbols-outlined">chevron_right</span>
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Stories (Bento Grid) -->
    <section class="py-section-padding bg-surface-muted/50">
      <div class="px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 class="font-headline-xl text-headline-xl text-on-surface mb-2">나눔 이야기</h2>
            <p class="text-on-surface-variant font-body-md">나눔으로 일궈낸 따뜻한 변화의 기록들입니다.</p>
          </div>
          <router-link to="/story" class="text-primary font-bold border-b-2 border-primary hover:text-leaf-green hover:border-leaf-green transition-all pb-1">전체 이야기 보기</router-link>
        </div>
        <div v-if="recentStories.length" class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          <!-- 최신 글 1: 좌측 큰 카드 -->
          <router-link
            :to="`/story/${recentStories[0].id}`"
            class="lg:col-span-8 group relative rounded-2xl overflow-hidden soft-shadow hover-lift"
          >
            <img
              :alt="recentStories[0].title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :src="recentStories[0].img || '/static/spring.jpg'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8 w-full">
              <span :class="categoryColor(recentStories[0].category)" class="font-bold text-label-sm mb-2 block">{{ recentStories[0].category }}</span>
              <h3 class="font-headline-xl text-headline-lg text-white mb-4">{{ recentStories[0].title }}</h3>
              <p class="text-white/80 font-body-lg line-clamp-2 mb-6 max-w-2xl">{{ recentStories[0].desc }}</p>
              <span class="text-white/60 text-label-sm">{{ recentStories[0].date }}</span>
            </div>
          </router-link>

          <!-- 최신 글 2·3: 우측 작은 카드 2개 -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            <router-link
              v-if="recentStories[1]"
              :to="`/story/${recentStories[1].id}`"
              class="flex-1 group relative rounded-2xl overflow-hidden soft-shadow hover-lift min-h-[250px]"
            >
              <img
                :alt="recentStories[1].title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                :src="recentStories[1].img || '/static/spring.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-6 w-full">
                <span :class="categoryColor(recentStories[1].category)" class="font-bold text-label-sm mb-1 block">{{ recentStories[1].category }}</span>
                <h3 class="font-headline-md text-xl text-white mb-2">{{ recentStories[1].title }}</h3>
                <span class="text-white/60 text-label-sm">{{ recentStories[1].date }}</span>
              </div>
            </router-link>
            <router-link
              v-if="recentStories[2]"
              :to="`/story/${recentStories[2].id}`"
              class="flex-1 group relative rounded-2xl overflow-hidden soft-shadow hover-lift min-h-[250px]"
            >
              <img
                :alt="recentStories[2].title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                :src="recentStories[2].img || '/static/spring.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-6 w-full">
                <span :class="categoryColor(recentStories[2].category)" class="font-bold text-label-sm mb-1 block">{{ recentStories[2].category }}</span>
                <h3 class="font-headline-md text-xl text-white mb-2">{{ recentStories[2].title }}</h3>
                <span class="text-white/60 text-label-sm">{{ recentStories[2].date }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Notice & News -->
    <section class="py-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- 공지사항 -->
        <div>
          <div class="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
            <h2 class="font-headline-lg text-headline-lg flex items-center gap-2">
              공지사항
              <span class="material-symbols-outlined text-leaf-green">notifications</span>
            </h2>
            <router-link to="/notice" class="text-on-surface-variant hover:text-primary transition-all">
              <span class="material-symbols-outlined">add</span>
            </router-link>
          </div>
          <ul class="space-y-0">
            <li
              v-for="notice in recentNotices"
              :key="notice.id"
              class="group py-5 border-b border-outline-variant/30 flex justify-between items-center hover:bg-surface-container-low transition-all px-2 rounded-lg"
            >
              <router-link :to="`/notice/${notice.id}`" class="flex-1 min-w-0">
                <span v-if="notice.isNotice" class="bg-leaf-green/10 text-leaf-green px-2 py-0.5 rounded font-label-sm text-xs mr-3 align-middle">공지</span>
                <span class="text-on-surface group-hover:text-primary transition-all font-body-md">{{ notice.title }}</span>
              </router-link>
              <span class="text-on-surface-variant font-label-sm opacity-60 ml-4 flex-shrink-0">{{ notice.date }}</span>
            </li>
          </ul>
        </div>

        <!-- 보도자료 -->
        <div>
          <div class="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
            <h2 class="font-headline-lg text-headline-lg flex items-center gap-2">
              보도자료
              <span class="material-symbols-outlined text-sky-blue">newspaper</span>
            </h2>
            <router-link to="/press" class="text-on-surface-variant hover:text-primary transition-all">
              <span class="material-symbols-outlined">add</span>
            </router-link>
          </div>
          <div class="space-y-6">
            <router-link
              v-for="article in recentPress"
              :key="article.id"
              :to="`/press/${article.id}`"
              class="flex gap-6 group"
            >
              <div class="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  :src="article.featuredImage || '/static/spring.jpg'"
                  :alt="article.title"
                />
              </div>
              <div class="min-w-0">
                <span :class="article.typeColor" class="font-label-sm text-xs mb-1 block">{{ article.type }}</span>
                <h4 class="font-headline-md text-lg mb-1 group-hover:text-primary transition-all line-clamp-2">{{ article.title }}</h4>
                <span class="text-on-surface-variant font-label-sm opacity-60">{{ article.date }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-container/10 py-section-padding border-y border-outline-variant/20">
      <div class="px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center">
        <h2 class="font-headline-xl text-headline-xl text-primary mb-6">
          당신의 소중한 나눔이<br/>누군가의 인생에 꽃이 됩니다.
        </h2>
        <p class="font-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
          후원자님의 따뜻한 마음은 투명하게 관리되며, 소외된 이웃들이 스스로 자립할 수 있는 밑거름이 됩니다.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/donate" class="px-10 py-4 bg-primary text-on-primary rounded-full font-headline-md shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all">후원 신청</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { fetchHeroSlides } from '../api/heroSlides'
import { fetchSiteConfig, getSiteText, getHeroUrl } from '../api/siteConfig'
import { fetchStories } from '../api/stories'
import { fetchNotices } from '../api/notices'
import { fetchPressArticles } from '../api/press'

const stats = reactive({
  statOrchestra:   '128회',
  statScholarship: '542명',
  statDonation:    '15.2억',
})

const recentStories = ref([])
const recentNotices = ref([])
const recentPress = ref([])

const projectImages = reactive({
  orchestra:   '/static/orch_main.jpg',
  nanum:       '/static/edu.jpg',
  scholarship: '/static/students.jpeg',
})

const CATEGORY_COLORS = {
  '봉사활동': 'text-warm-accent',
  '지역사회': 'text-leaf-green',
  '문화행사': 'text-sky-blue',
  '나눔기록': 'text-warm-accent',
  '감사나눔': 'text-leaf-green',
  '문화예술': 'text-sky-blue',
  '활동기록': 'text-sky-blue',
}
function categoryColor(cat) {
  return CATEGORY_COLORS[cat] || 'text-sky-blue'
}

const heroImages = ref([])

const currentSlide = ref(0)
let timer = null

function goToSlide(i) {
  currentSlide.value = i
  resetTimer()
}

function nextSlide() {
  if (!heroImages.value.length) return
  currentSlide.value = (currentSlide.value + 1) % heroImages.value.length
}

function nextSlideManual() {
  nextSlide()
  resetTimer()
}

function prevSlide() {
  if (!heroImages.value.length) return
  currentSlide.value = (currentSlide.value - 1 + heroImages.value.length) % heroImages.value.length
  resetTimer()
}

function resetTimer() {
  clearInterval(timer)
  timer = setInterval(nextSlide, 5000)
}

const SLIDES_CACHE_KEY = 'hero_slides_v1'

function startSlider(slides) {
  heroImages.value = slides
  currentSlide.value = 0
  clearInterval(timer)
  timer = setInterval(nextSlide, 5000)
}

onMounted(() => {
  // 캐시된 슬라이드가 있으면 즉시 표시 (검은 화면 없음)
  try {
    const cached = localStorage.getItem(SLIDES_CACHE_KEY)
    if (cached) startSlider(JSON.parse(cached))
  } catch {}

  // 백그라운드에서 최신 데이터 fetch → 캐시 갱신 + UI 업데이트
  fetchHeroSlides().then(slides => {
    if (slides.length) {
      try { localStorage.setItem(SLIDES_CACHE_KEY, JSON.stringify(slides)) } catch {}
      startSlider(slides)
    }
  })

  // 나머지 데이터는 병렬 로드 (hero 로딩을 블로킹하지 않음)
  Promise.all([
    fetchSiteConfig(),
    fetchStories(),
    fetchNotices(),
    fetchPressArticles(),
  ]).then(([config, allStories, allNotices, allPress]) => {
    stats.statOrchestra   = getSiteText(config, 'statOrchestra')
    stats.statScholarship = getSiteText(config, 'statScholarship')
    stats.statDonation    = getSiteText(config, 'statDonation')
    projectImages.orchestra   = getHeroUrl(config, 'heroOrchestra')
    projectImages.nanum       = getHeroUrl(config, 'heroNanum')
    projectImages.scholarship = getHeroUrl(config, 'heroScholarship')
    recentStories.value   = allStories.slice(0, 3)
    recentNotices.value   = allNotices.slice(0, 3)
    recentPress.value     = allPress.slice(0, 2)
  })
})
onUnmounted(() => { clearInterval(timer) })
</script>
