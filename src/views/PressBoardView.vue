<template>
  <main>
    <!-- Hero Banner -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="언론 보도자료 배너"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/10"></div>
    </section>

    <BreadCrumb current="언론 보도자료" parent="꽃재 이야기" />

    <!-- Main Content -->
    <section class="bg-white min-h-screen py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <!-- Content Header -->
        <div class="mb-16">
          <div class="flex flex-col gap-4">
            <span class="text-leaf-green font-label-sm text-label-sm tracking-[0.2em] font-bold">SHARING STORIES</span>
            <h2 class="text-on-surface font-headline-lg text-headline-lg">언론 보도자료</h2>
            <div class="w-[60px] h-1 bg-leaf-green rounded-full"></div>
            <p class="text-on-surface-variant max-w-2xl text-body-lg font-body-lg">
              꽃재와 함께 피어나는 따뜻한 변화의 순간들을 언론을 통해 공유합니다.
            </p>
          </div>
        </div>

        <!-- Search & Count Row -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div class="flex items-baseline gap-2">
            <span class="text-on-surface font-headline-md text-headline-md">전체</span>
            <span class="text-leaf-green font-headline-md text-headline-md font-bold">{{ pressItems.length }}</span>
            <span class="text-on-surface-variant font-body-md text-body-md">건</span>
          </div>
          <div class="relative w-full md:w-96 group">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="검색어를 입력하세요"
              class="w-full bg-surface-muted border-none rounded-lg py-3.5 pl-4 pr-12 text-body-md focus:ring-2 focus:ring-leaf-green transition-all placeholder:text-on-surface-variant/50"
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant group-hover:text-leaf-green transition-colors">
              <span class="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>

        <!-- Board Table -->
        <div class="w-full overflow-hidden border-t-2 border-on-surface">
          <!-- Table Header (desktop only) -->
          <div class="hidden md:flex bg-surface-muted py-4 px-6 font-label-sm text-label-sm text-on-surface-variant border-b border-outline-variant/30">
            <div class="w-20 text-center">번호</div>
            <div class="flex-1 px-10">제목</div>
            <div class="w-32 text-center">작성일</div>
          </div>

          <!-- Board Rows -->
          <div class="divide-y divide-outline-variant/20">
            <router-link
              v-for="(item, index) in pagedItems"
              :key="item.id"
              :to="'/press/' + item.id"
              class="group flex flex-col md:flex-row md:items-center py-6 px-6 transition-all hover:bg-surface-container-low"
            >
              <div class="hidden md:block w-20 text-center text-on-surface-variant font-label-sm text-label-sm">
                {{ (currentPage - 1) * PAGE_SIZE + index + 1 }}
              </div>
              <div class="flex-1 md:px-10 flex flex-col gap-1">
                <div class="text-on-surface font-body-lg font-bold transition-all duration-300 group-hover:text-leaf-green group-hover:translate-x-1 line-clamp-1">
                  <span :class="item.typeColor" class="mr-2">[{{ item.type }}]</span>{{ item.title }}
                </div>
                <div class="md:hidden mt-2 flex items-center gap-4 text-on-surface-variant font-label-sm text-[12px]">
                  <span>No. {{ (currentPage - 1) * PAGE_SIZE + index + 1 }}</span>
                  <span class="w-px h-2 bg-outline-variant"></span>
                  <span>{{ item.date }}</span>
                </div>
              </div>
              <div class="hidden md:block w-32 text-center text-on-surface-variant font-body-md text-body-md">
                {{ item.date }}
              </div>
            </router-link>

            <div v-if="filteredItems.length === 0" class="py-16 text-center text-on-surface-variant font-body-md text-body-md">
              검색 결과가 없습니다.
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="currentPage = 1"
          >
            <span class="material-symbols-outlined text-[20px]">keyboard_double_arrow_left</span>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div class="flex gap-1 mx-2">
            <button
              v-for="p in visiblePages"
              :key="p"
              class="w-10 h-10 flex items-center justify-center rounded-lg font-label-sm text-label-sm transition-all"
              :class="p === currentPage
                ? 'bg-leaf-green text-white font-bold'
                : 'hover:bg-surface-container text-on-surface-variant'"
              @click="currentPage = p"
            >{{ p }}</button>
          </div>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
import { ref, computed, watch, onMounted } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchPressArticles } from '../api/press'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroPress')

const PAGE_SIZE = 10
const searchQuery = ref('')
const pressItems = ref([])
const currentPage = ref(1)

const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return pressItems.value
  const q = searchQuery.value.trim().toLowerCase()
  return pressItems.value.filter(item => item.title.toLowerCase().includes(q) || item.type.includes(q))
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / PAGE_SIZE)))

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredItems.value.slice(start, start + PAGE_SIZE)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  const half = 2
  let start = Math.max(1, cur - half)
  let end = Math.min(total, start + 4)
  start = Math.max(1, end - 4)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

watch(searchQuery, () => { currentPage.value = 1 })

onMounted(async () => {
  pressItems.value = await fetchPressArticles()
})
</script>
