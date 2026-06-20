<template>
  <main>
    <!-- Hero Section -->
    <section class="relative w-full h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="꽃재 평생교육원 히어로"
        class="w-full h-full object-cover"
      />
    </section>

    <BreadCrumb current="꽃재 평생교육원" parent="꽃재 이야기" />

    <!-- Main Content -->
    <section class="bg-surface-container-lowest py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <!-- Section Header -->
        <div class="mb-12">
          <div class="text-leaf-green font-label-sm text-label-sm uppercase mb-2 tracking-wider">Lifelong Education</div>
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">꽃재 평생교육원</h2>
          <div class="h-1 w-12 bg-leaf-green mt-4 mb-6"></div>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            <div class="text-on-surface-variant">지역 주민들의 풍요로운 삶을 위한 다양한 교육 프로그램을 운영합니다.</div>
            <div class="text-on-surface-variant">배움의 즐거움과 나눔의 기쁨이 함께하는 꽃재로 초대합니다.</div>
          </p>
        </div>

        <!-- Program Card Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link
            v-for="program in pagedPrograms"
            :key="program.id"
            :to="`/education/${program.id}`"
            class="group bg-white rounded-xl overflow-hidden transition-all duration-300 border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.08)]"
          >
            <div class="aspect-video overflow-hidden relative">
              <img
                :src="program.img"
                :alt="program.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div :class="program.badgeColor" class="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-label-sm font-label-sm">
                {{ program.badge }}
              </div>
            </div>
            <div class="p-6">
              <span class="text-leaf-green font-label-sm text-label-sm uppercase tracking-wider block mb-2">{{ program.category }}</span>
              <h4 class="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">{{ program.title }}</h4>
              <p class="text-on-surface-variant font-body-md text-body-md line-clamp-2">{{ program.desc }}</p>
              <div class="mt-6 flex items-center text-primary font-bold text-label-sm font-label-sm">
                자세히 보기
                <span class="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-16 mb-8">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="currentPage = 1"
          >
            <span class="material-symbols-outlined text-[20px]">keyboard_double_arrow_left</span>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div class="flex items-center gap-1 mx-2">
            <button
              v-for="p in visiblePages"
              :key="p"
              class="w-10 h-10 flex items-center justify-center rounded-lg font-label-sm text-label-sm transition-all"
              :class="p === currentPage
                ? 'bg-leaf-green text-white font-bold shadow-sm'
                : 'border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green'"
              @click="currentPage = p"
            >{{ p }}</button>
          </div>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
            @click="currentPage = totalPages"
          >
            <span class="material-symbols-outlined text-[20px]">keyboard_double_arrow_right</span>
          </button>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchPrograms } from '../api/programs'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroEducation')

const PAGE_SIZE = 6
const programs = ref([])
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(programs.value.length / PAGE_SIZE)))

const pagedPrograms = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return programs.value.slice(start, start + PAGE_SIZE)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  let start = Math.max(1, cur - 2)
  let end = Math.min(total, start + 4)
  start = Math.max(1, end - 4)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

onMounted(async () => {
  programs.value = await fetchPrograms()
})
</script>
