<template>
  <main>
    <!-- Hero Banner -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="나눔이야기 배너"
        class="w-full h-full object-cover absolute inset-0"
      />
    </section>

    <BreadCrumb current="나눔 이야기" parent="꽃재 이야기" />

    <!-- Page Header -->
    <section class="bg-white pt-section-padding pb-0 overflow-hidden">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div class="mb-12">
          <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold font-label-sm text-label-sm rounded-full mb-4">Sharing Stories</span>
          <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">나눔이야기</h2>
          <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
        </div>
        <p class="text-on-surface-variant font-body-lg text-body-lg mb-12">
          우리의 작은 손길이 모여 큰 기쁨이 되는 순간들을 기록합니다.<br />
          꽃재가 만들어가는 따뜻한 변화를 만나보세요.
        </p>
      </div>
    </section>

    <!-- Story Grid -->
    <section class="bg-white py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">활동 소식</h2>
            <p class="text-on-surface-variant font-body-md text-body-md">지역사회와 함께하는 꽃재의 나눔 발자취입니다.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <router-link
            v-for="story in stories"
            :key="story.id"
            :to="`/story/${story.id}`"
            class="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant transition-all hover:shadow-lg"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="story.img"
                :alt="story.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <span class="text-leaf-green font-bold font-label-sm text-label-sm mb-3">{{ story.category }}</span>
              <h3 class="font-headline-md text-headline-md text-on-surface mb-3 line-clamp-2">{{ story.title }}</h3>
              <p class="text-on-surface-variant font-body-md text-body-md mb-6 line-clamp-3">{{ story.desc }}</p>
              <div class="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
                <span>{{ story.date }}</span>
                <span class="flex items-center gap-1 group-hover:text-leaf-green transition-colors cursor-pointer">
                  자세히 보기 <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-16 flex justify-center items-center space-x-2">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant transition-colors"
            :class="currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container'"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>

          <template v-for="p in pageNumbers" :key="p">
            <span v-if="p === '...'" class="w-10 h-10 flex items-center justify-center text-on-surface-variant">…</span>
            <button
              v-else
              class="w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors"
              :class="p === currentPage
                ? 'bg-leaf-green text-white'
                : 'border border-outline-variant hover:bg-surface-container'"
              @click="goToPage(p)"
            >{{ p }}</button>
          </template>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant transition-colors"
            :class="currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-container'"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchStoriesPage } from '../api/stories'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroStory')

const stories     = ref([])
const currentPage = ref(1)
const totalPages  = ref(1)

async function load(page) {
  const { stories: items, pagination } = await fetchStoriesPage(page)
  stories.value     = items
  currentPage.value = pagination.page
  totalPages.value  = pagination.pageCount
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  load(page)
}

// 표시할 페이지 번호 배열 (최대 7개, 넘으면 … 처리)
const pageNumbers = computed(() => {
  const total = totalPages.value
  const cur   = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = []
  pages.push(1)
  if (cur > 3)        pages.push('...')
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p)
  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

onMounted(() => load(1))
</script>
