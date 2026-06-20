<template>
  <main>
    <!-- Hero Section -->
    <section class="relative w-full h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="카페 마노아 히어로"
        class="w-full h-full object-cover"
      />
    </section>

    <BreadCrumb current="카페 마노아" parent="사업" />

    <!-- Main Content -->
    <section class="bg-surface-container-lowest py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <!-- Section Header -->
        <div class="mb-12">
          <div class="text-leaf-green font-label-sm text-label-sm uppercase mb-2 tracking-wider">Cafe Manoa</div>
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">카페 마노아</h2>
          <div class="h-1 w-12 bg-leaf-green mt-4 mb-6"></div>
          <p class="font-body-lg text-body-lg text-on-surface-variant">
            카페 마노아의 일상과 메뉴를 소개합니다.
          </p>
        </div>

        <!-- Card Grid (4 columns) -->
        <div v-if="pagedPosts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            v-for="post in pagedPosts"
            :key="post.id"
            :to="`/cafe/${post.id}`"
            class="group bg-white rounded-xl overflow-hidden transition-all duration-300 border border-outline-variant/10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.08)]"
          >
            <div class="aspect-video overflow-hidden bg-surface-dim">
              <img
                v-if="post.img"
                :src="post.img"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-4">
              <h4 class="font-headline-md text-[16px] leading-snug text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {{ post.title }}
              </h4>
              <p class="text-on-surface-variant font-label-sm text-label-sm mb-4">{{ post.date }}</p>
              <div class="flex items-center text-primary font-bold text-label-sm font-label-sm">
                자세히 보기
                <span class="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
              </div>
            </div>
          </router-link>
        </div>

        <div v-else class="text-center py-20 text-on-surface-variant">
          등록된 게시물이 없습니다.
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
import { fetchCafePosts } from '../api/cafe'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroCafe')

const PAGE_SIZE = 8
const posts = ref([])
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(posts.value.length / PAGE_SIZE)))

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return posts.value.slice(start, start + PAGE_SIZE)
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
  posts.value = await fetchCafePosts()
})
</script>
