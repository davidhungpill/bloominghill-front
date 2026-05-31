<template>
  <main>
    <!-- Hero Section -->
    <section class="w-full h-[300px] md:h-[400px] relative overflow-hidden">
      <img
        src="/public/static/notice.jpg"
        alt="공지사항 배너"
        class="w-full h-full object-cover"
      />
    </section>

    <BreadCrumb current="공지사항" parent="소식" />

    <!-- Main Content -->
    <section class="bg-white py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <!-- Section Header -->
        <div class="mb-12">
          <div class="font-bold text-leaf-green mb-2 uppercase tracking-wide font-label-sm text-label-sm">Notice &amp; News</div>
          <h1 class="font-headline-xl text-headline-xl mb-4 text-on-surface">공지사항</h1>
          <div class="h-1 bg-leaf-green w-12 mb-6"></div>
          <p class="font-body-lg text-body-lg text-on-surface-variant">꽃재의 새로운 소식과 안내사항을 전해드립니다.</p>
        </div>

        <!-- Search Bar -->
        <div class="flex justify-end mb-6">
          <div class="relative w-full md:w-80">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="검색어를 입력하세요"
              class="w-full bg-surface-muted border-none rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-leaf-green transition-all outline-none font-body-md text-body-md"
            />
            <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          </div>
        </div>

        <!-- Board Table -->
        <div class="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-outline-variant/30">
          <table class="w-full text-left border-collapse">
            <thead class="bg-surface-muted border-b border-outline-variant/30">
              <tr>
                <th class="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant w-20 text-center">번호</th>
                <th class="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant">제목</th>
                <th class="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant w-32 text-center">작성일</th>
              </tr>
            </thead>
            <tbody class="font-body-md text-body-md">
              <tr
                v-for="item in filteredItems"
                :key="item.isNotice ? 'notice-' + item.title : item.id"
                class="group border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <td class="px-6 py-5 text-center">
                  <span
                    v-if="item.isNotice"
                    class="bg-leaf-green/10 text-leaf-green px-3 py-1 rounded-full text-xs font-bold"
                  >공지</span>
                  <span v-else class="text-on-surface-variant font-label-sm text-label-sm">{{ item.id }}</span>
                </td>
                <td
                  class="px-6 py-5 text-on-surface group-hover:text-leaf-green transition-colors"
                  :class="item.isNotice ? 'font-semibold' : ''"
                >
                  {{ item.title }}
                </td>
                <td class="px-6 py-5 text-on-surface-variant text-center font-label-sm text-label-sm">{{ item.date }}</td>
              </tr>
              <tr v-if="filteredItems.length === 0">
                <td colspan="3" class="px-6 py-16 text-center text-on-surface-variant font-body-md text-body-md">
                  검색 결과가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-12 flex justify-center items-center gap-2">
          <button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant border border-outline-variant/30">
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold font-label-sm text-label-sm">1</button>
          <button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/30">2</button>
          <button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/30">3</button>
          <button class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant border border-outline-variant/30">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'

const searchQuery = ref('')

const notices = [
  { isNotice: true,  title: '[안내] 2024년 결산 공고 및 지정기부금 단체 실적 공시', date: '2024.03.15' },
  { isNotice: true,  title: '[공지] 제5회 정기연주회 관람 신청 안내 (무료 공연)', date: '2024.03.02' },
  { id: 8, isNotice: false, title: '꽃재 나눔 릴레이 캠페인 참여 안내', date: '2024.02.28' },
  { id: 7, isNotice: false, title: '2024년 상반기 장학생 선발 안내', date: '2024.02.15' },
  { id: 6, isNotice: false, title: '자원봉사자 모집: 지역아동센터 음악 교육 지원', date: '2024.02.10' },
  { id: 5, isNotice: false, title: '설 연휴 사무국 휴무 및 운영 안내', date: '2024.02.05' },
  { id: 4, isNotice: false, title: '2023년 하반기 사업보고서 공시 안내', date: '2023.12.20' },
  { id: 3, isNotice: false, title: '꽃재 바자회 수익금 전달식 개최 안내', date: '2023.11.15' },
  { id: 2, isNotice: false, title: '2023년 정기총회 개최 공고', date: '2023.10.30' },
  { id: 1, isNotice: false, title: '사단법인 꽃재 홈페이지 개편 안내', date: '2023.09.01' },
]

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return notices
  const pinnedMatches = notices.filter(n => n.isNotice && n.title.toLowerCase().includes(q))
  const regularMatches = notices.filter(n => !n.isNotice && n.title.toLowerCase().includes(q))
  return [...pinnedMatches, ...regularMatches]
})
</script>
