<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
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
                <th class="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant w-44 text-center">작성일</th>
              </tr>
            </thead>
            <tbody class="font-body-md text-body-md">
              <tr
                v-for="(item, index) in pagedItems"
                :key="item.id"
                class="group border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors cursor-pointer"
                @click="router.push('/notice/' + item.id)"
              >
                <td class="px-6 py-5 text-center text-on-surface-variant font-label-sm text-label-sm">
                  {{ (currentPage - 1) * PAGE_SIZE + index + 1 }}
                </td>
                <td
                  class="px-6 py-5 text-on-surface group-hover:text-leaf-green transition-colors"
                  :class="item.isNotice ? 'font-semibold' : ''"
                >
                  <span
                    v-if="item.isNotice"
                    class="inline-block bg-leaf-green/10 text-leaf-green px-2 py-0.5 rounded text-xs font-bold mr-2 align-middle"
                  >공지</span>{{ item.title }}
                </td>
                <td class="px-6 py-5 text-on-surface-variant text-center font-label-sm text-label-sm whitespace-nowrap">{{ item.date }}</td>
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
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === 1"
            @click="currentPage = 1"
          >
            <span class="material-symbols-outlined text-[20px]">keyboard_double_arrow_left</span>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
                ? 'bg-primary text-white font-bold'
                : 'hover:bg-surface-container text-on-surface-variant border border-outline-variant/30'"
              @click="currentPage = p"
            >{{ p }}</button>
          </div>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
import { useRouter } from 'vue-router'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchNotices } from '../api/notices'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroNotice')
const router = useRouter()

const PAGE_SIZE = 10
const searchQuery = ref('')
const notices = ref([])
const currentPage = ref(1)

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return notices.value
  const pinned = notices.value.filter(n => n.isNotice && n.title.toLowerCase().includes(q))
  const regular = notices.value.filter(n => !n.isNotice && n.title.toLowerCase().includes(q))
  return [...pinned, ...regular]
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / PAGE_SIZE)))

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredItems.value.slice(start, start + PAGE_SIZE)
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

watch(searchQuery, () => { currentPage.value = 1 })

onMounted(async () => {
  notices.value = await fetchNotices()
})
</script>
