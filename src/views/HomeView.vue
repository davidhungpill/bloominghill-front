<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <!-- 슬라이드 이미지 -->
        <img
          v-for="(img, i) in heroImages"
          :key="img.src"
          :src="img.src"
          :alt="img.alt"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          :class="i === currentSlide ? 'opacity-100' : 'opacity-0'"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
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
            세상을 꽃피우는<br/>따뜻한 울림, 꽃재
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
        <h2 class="font-headline-xl text-headline-xl text-on-surface mb-4">꽃재의 핵심 사업</h2>
        <p class="text-on-surface-variant font-body-lg max-w-2xl mx-auto">더 나은 세상을 위해 꽃재가 앞장서서 실천하는 아름다운 나눔의 가치들입니다.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <router-link to="/orchestra" class="group bg-white rounded-2xl overflow-hidden soft-shadow hover-lift border border-outline-variant/10 block">
          <div class="h-64 overflow-hidden relative">
            <img
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk8Q8fqf9R2fhX4MudICviCBh5Xxc78WnLOUoSnwtyFRRnzMGHv2nCVzHHATNYQdGwxcvnsILzBVfpZOBny77Zxy_wgWzgp8Okzw5S90Mf61U9ttKMRkkAGIe4ObSbml9jd56BgJOl4mzIAxXtl3V_0h-994-ZbmVTGBpagygJAixEclTem2wcb9mLXn8fqf_RS11-VKSr5edz8iJrNZiy698BKzlYDMNXjbFUtvQAUf1KwinNNBjGPX14nE6wmSZsJl9vnSp5Oy5G"
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
              src="/static/edu.jpg"
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdfpoxLHDXOW96drDsQGvA2K7HRVhkZbP10FJwVUgiT3HjXkbqV-y3MysTW6EcmbsOQ1Rf9S67gipeC_-Y8cT6qFp44daVGk8yFfz9AoV9-bwGWhO2j8qbA9UVi9Bm3R5cQinM8Ct4x4T8iC_u2SkEnHYULuPmmEdoYR16b9r07zh1YXcKkQOHW2N6BwJ_S0wo2fz0AVNNfFZ0bsB6zwzrmSH24in0Bbp8V-cuyfnHreip7iX8CQWm0TimWMSWTb4Nxl74gEXTEyGC"
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
            <h2 class="font-headline-xl text-headline-xl text-on-surface mb-2">꽃재 이야기</h2>
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
            <a href="#" class="text-on-surface-variant hover:text-primary transition-all">
              <span class="material-symbols-outlined">add</span>
            </a>
          </div>
          <ul class="space-y-0">
            <li class="group py-5 border-b border-outline-variant/30 flex justify-between items-center hover:bg-surface-container-low transition-all px-2 rounded-lg">
              <a href="#" class="flex-1">
                <span class="bg-surface-container-high text-primary px-2 py-0.5 rounded font-label-sm text-xs mr-3 align-middle">중요</span>
                <span class="text-on-surface group-hover:text-primary transition-all font-body-md">사회복지법인 꽃재 2024년 결산 공고 안내</span>
              </a>
              <span class="text-on-surface-variant font-label-sm opacity-60">2024.11.10</span>
            </li>
            <li class="group py-5 border-b border-outline-variant/30 flex justify-between items-center hover:bg-surface-container-low transition-all px-2 rounded-lg">
              <a href="#" class="flex-1">
                <span class="text-on-surface group-hover:text-primary transition-all font-body-md">제 15회 꽃재 정기연주회 관람 신청 안내</span>
              </a>
              <span class="text-on-surface-variant font-label-sm opacity-60">2024.11.05</span>
            </li>
            <li class="group py-5 border-b border-outline-variant/30 flex justify-between items-center hover:bg-surface-container-low transition-all px-2 rounded-lg">
              <a href="#" class="flex-1">
                <span class="text-on-surface group-hover:text-primary transition-all font-body-md">하반기 장학생 최종 선발 결과 공지</span>
              </a>
              <span class="text-on-surface-variant font-label-sm opacity-60">2024.10.28</span>
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
            <a href="#" class="text-on-surface-variant hover:text-primary transition-all">
              <span class="material-symbols-outlined">add</span>
            </a>
          </div>
          <div class="space-y-6">
            <div class="flex gap-6 group cursor-pointer">
              <div class="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7_o9bMytoYSKyHEQln-72743Y_76yB7yObPeqGbgg29PbGvGSm_7ROifJLzjJOW6BVSD0QCYOpFtv7nAH3b-IUVlBsh9Fp-2vGWygUHcEmIpD8mwHoe8DkX_qG6tWj6ewB56KyfDCVIteyj-65m_LcLnuMvlK79eMvJuaeNUS_rBTOV6KmFR2i2twUAaUoPa80e9CHc3r7yGPuMCOEer59fhhQoXxBmgnUWtqIQ2myUkXrHpH-fnX3FXc3UUkQ2oQuH5Av7dM6OCx"
                  alt="보도자료 1"
                />
              </div>
              <div>
                <h4 class="font-headline-md text-lg mb-2 group-hover:text-primary transition-all">꽃재, 취약계층 겨울나기 '따뜻한 방학' 지원 성료</h4>
                <p class="text-on-surface-variant line-clamp-2 font-label-sm">사회복지법인 꽃재는 지난 15일 지역 내 취약계층 200가구에 방한용품 키트를 전달하는...</p>
              </div>
            </div>
            <div class="flex gap-6 group cursor-pointer">
              <div class="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZAzHULMbv0NfohnS8v-YP93vHAmLxYMd2z5aD1Jo0VT51dR8yhJjMaWHHWa935NdKtWC7tHqImAK3a33Ej0CoGc7mXtgC7lmviUiotgtxXHjR7Im6VEB73Qkq1_iLCqf63KZSnEuBOa2WA8KH3dyBYC6Rw7zN66YuxlnLn1v-NUYSpXLFWLLnjpbS4e7514Er8bwIWb96B-DFBjU95tEv0cPfL-Ec7kogNw5FasY65_Nb_XdHbfOHCjCAOy28GItXXoiDutySVd5m"
                  alt="보도자료 2"
                />
              </div>
              <div>
                <h4 class="font-headline-md text-lg mb-2 group-hover:text-primary transition-all">'음악으로 하나 되는 우리' 꽃재 오케스트라 초청 연주회 개최</h4>
                <p class="text-on-surface-variant line-clamp-2 font-label-sm">세종문화회관 체임버홀에서 열린 이번 연주회는 시민 500여명이 참석한 가운데 성황리에...</p>
              </div>
            </div>
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
import { fetchSiteConfig, getSiteText } from '../api/siteConfig'
import { fetchStories } from '../api/stories'

const stats = reactive({
  statOrchestra:   '128회',
  statScholarship: '542명',
  statDonation:    '15.2억',
})

const recentStories = ref([])

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

const heroImages = ref([
  { src: '/static/orchestra.jpg', alt: '꽃재 오케스트라' },
  { src: '/static/spring2.jpg',   alt: '꽃재 봄 활동' },
  { src: '/static/edu.jpg',       alt: '꽃재 교육 사업' },
  { src: '/static/cleaning.jpg',  alt: '꽃재 봉사 활동' },
])

const currentSlide = ref(0)
let timer = null

function goToSlide(i) {
  currentSlide.value = i
  resetTimer()
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroImages.value.length
}

function nextSlideManual() {
  nextSlide()
  resetTimer()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + heroImages.value.length) % heroImages.value.length
  resetTimer()
}

function resetTimer() {
  clearInterval(timer)
  timer = setInterval(nextSlide, 5000)
}

onMounted(async () => {
  const [slides, config, allStories] = await Promise.all([
    fetchHeroSlides(),
    fetchSiteConfig(),
    fetchStories(),
  ])
  heroImages.value = slides
  currentSlide.value = 0
  timer = setInterval(nextSlide, 5000)
  stats.statOrchestra   = getSiteText(config, 'statOrchestra')
  stats.statScholarship = getSiteText(config, 'statScholarship')
  stats.statDonation    = getSiteText(config, 'statDonation')
  recentStories.value   = allStories.slice(0, 3)
})
onUnmounted(() => { clearInterval(timer) })
</script>
