<template>
  <main>
    <SubPageHero />
    <BreadCrumb current="연혁" />

    <section class="bg-white">
    <div class="max-w-container-max mx-auto px-gutter py-section-padding">
      <div class="flex flex-col md:flex-row gap-16 relative">
        <!-- 사이드 연도 네비 -->
        <aside class="md:w-32 flex-shrink-0">
          <div class="sticky top-40 flex flex-col items-center">
            <template v-for="(y, i) in years" :key="y">
              <a
                :href="`#year-${y}`"
                class="nav-year-btn w-16 h-16 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold text-headline-md text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-all"
                :class="{ active: activeYear === y }"
                @click.prevent="scrollToYear(y)"
              >{{ y }}</a>
              <div v-if="i < years.length - 1" class="w-px h-6 bg-outline-variant"></div>
            </template>
          </div>
        </aside>

        <!-- 타임라인 콘텐츠 -->
        <div class="flex-grow">
          <div class="mb-16">
            <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4">History</span>
            <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-6">
              꽃재가 걸어온<br/><span class="text-leaf-green">희망과 나눔의 기록입니다.</span>
            </h2>
            <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
          </div>

          <div class="relative pl-6 timeline-container">
            <section v-for="(group, idx) in historyData" :key="group.year" class="mb-20 scroll-mt-32" :id="`year-${group.year}`">
              <div class="year-indicator">
                <h3 class="text-headline-xl font-extrabold text-leaf-green mb-10">{{ group.year }}</h3>
              </div>
              <ul class="space-y-6">
                <li
                  v-for="(item, i) in group.items"
                  :key="i"
                  class="flex flex-col md:flex-row md:items-start gap-4 pb-6"
                  :class="i < group.items.length - 1 ? 'border-b border-surface-variant' : ''"
                >
                  <span class="text-leaf-green font-bold whitespace-nowrap min-w-[100px]">{{ item.date }}</span>
                  <p class="text-body-lg text-on-surface">{{ item.desc }}</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'

const years = [2025, 2024, 2023, 2022, 2021]
const activeYear = ref(2025)

const historyData = [
  {
    year: 2025,
    items: [
      { date: '10월 12일', desc: '왕도 한마음축제 연주 지원 (지역 주민 1,500명 대상 오케스트라 공연 지원)' },
      { date: '09월 25일', desc: '추석 사랑 나눔 캠페인 전개 (저소득 가정 200가구에 1,000만원 상당의 생필품 지원)' },
      { date: '01월 20일', desc: '설명절 사랑 나눔 캠페인 전개 (홀몸 어르신 150명 대상 명절 음식 꾸러미 전달)' },
      { date: '01월 10일', desc: '사랑의 김장김치 지역 사회 전달 (360박스 수량, 관내 취약계층 360가구 지원)' },
    ],
  },
  {
    year: 2024,
    items: [
      { date: '11월 15일', desc: '에너지 취약계층 대상 전기장판 나눔 사업 (100가정 선정, 온열기구 및 난방비 지원)' },
      { date: '06월 05일', desc: '브라보시니어 국수 나눔 봉사 정례화 (매주 수요일, 지역 어르신 평균 80명 식사 제공)' },
      { date: '03월 10일', desc: '다문화 가정 자녀 오케스트라 교육 지원 (총 25명 단원, 전문 강사 5인 레슨비 전액 지원)' },
    ],
  },
  {
    year: 2023,
    items: [
      { date: '12월 22일', desc: '고시촌 거주 청년 대상 겨울 이불 전달 (노량진 및 신림 지역 청년 100명 지원)' },
      { date: '08월 30일', desc: '국외 장학금 지원 사업 (태국, 캄보디아, 몽골 지역 인재 15명 선발, 연 3,000만원 지원)' },
      { date: '05월 18일', desc: '쪽방촌 문화사역 및 생필품 지원 (종로/서울역 인근 50가구 대상 정기 문화 공연 및 키트 제공)' },
    ],
  },
  {
    year: 2022,
    items: [
      { date: '10월 05일', desc: '필리핀 현지 방역 마스크 10,000매 나눔 (빈민가 학교 5개소 방역 물품 전달)' },
      { date: '05월 08일', desc: '브라보시니어 지역 어르신 초청 잔치 (어버이날 기념 어르신 120명 식사 및 선물 전달)' },
      { date: '03월 20일', desc: '꿈나무 다문화 오케스트라 악기 지원 (바이올린, 첼로 등 15대 신규 보급 및 전문 교습 개시)' },
    ],
  },
  {
    year: 2021,
    items: [
      { date: '12월 24일', desc: "'산타가 되어주세요' 성탄 선물 나눔 (결식아동 및 고아원 3개소, 총 80명 선물 박스 전달)" },
      { date: '11월 12일', desc: '제1회 사랑의 김장김치 나눔 (450박스 수량 생산, 지역 기초생활수급 450가구 전달)' },
      { date: '02월 01일', desc: '사단법인 꽃재 출범 및 첫 명절 나눔 사업 (소외계층 100가구 떡국 떡 및 식료품 지원)' },
    ],
  },
]

function scrollToYear(year) {
  activeYear.value = year
  const el = document.getElementById(`year-${year}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
