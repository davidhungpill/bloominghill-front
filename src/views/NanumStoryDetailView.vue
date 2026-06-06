<template>
  <main v-if="story">
    <!-- Hero Banner -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="나눔이야기 배너"
        class="w-full h-full object-cover absolute inset-0"
      />
    </section>

    <BreadCrumb :current="story.category" parent="나눔 이야기" />

    <!-- Post Detail -->
    <section class="bg-surface-container-lowest py-section-padding">
      <div class="max-w-4xl mx-auto px-margin-mobile md:px-gutter">
        <article class="bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">

          <!-- Post Header -->
          <header class="p-8 md:p-12 border-b border-outline-variant">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-primary-container/20 text-primary rounded-full font-label-sm text-label-sm">{{ story.category }}</span>
            </div>
            <h2 class="font-headline-lg text-headline-lg md:text-headline-xl text-on-surface leading-tight mb-6">{{ story.title }}</h2>
            <div class="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
              <div class="flex items-center gap-6">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[18px]">calendar_today</span>
                  {{ story.date }}
                </span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[18px]">visibility</span>
                  {{ story.views }} views
                </span>
              </div>
              <button class="hover:text-primary flex items-center gap-1 transition-colors">
                <span class="material-symbols-outlined text-[18px]">share</span>
                공유하기
              </button>
            </div>
          </header>

          <!-- Post Body -->
          <div class="p-8 md:p-12 space-y-12">
            <div class="space-y-8">
              <div class="story-content font-body-lg text-body-lg leading-relaxed text-on-surface-variant" v-html="story.content"></div>

              <div v-if="story.quote" class="bg-surface-muted p-8 rounded-2xl border-l-4 border-leaf-green">
                <p class="font-body-lg text-body-lg italic text-on-surface">{{ story.quote }}</p>
              </div>

              <div class="space-y-6 pt-4">
                <div
                  v-for="(img, i) in story.images"
                  :key="i"
                  class="rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)]"
                >
                  <img :src="img" :alt="`활동 사진 ${i + 1}`" class="w-full object-cover max-h-[600px]" />
                </div>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="story.tags && story.tags.length > 0" class="px-8 md:px-12 pb-12 flex flex-wrap gap-2">
            <span
              v-for="tag in story.tags"
              :key="tag"
              class="px-3 py-1.5 rounded-full text-[13px] font-medium"
              style="background:rgba(107,158,107,0.12); color:#3B6E3B;"
            >#{{ tag.replace(/^#/, '') }}</span>
          </div>

        </article>

        <!-- Bottom Navigation -->
        <div class="mt-12 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link
              v-if="adjacent.prev"
              :to="`/story/${adjacent.prev.id}`"
              class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:bg-surface-muted transition-colors group"
            >
              <span class="material-symbols-outlined text-primary group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <div class="flex-1 overflow-hidden">
                <p class="text-[12px] font-label-sm text-on-surface-variant uppercase">Previous Post</p>
                <p class="font-label-sm text-label-sm text-on-surface truncate">{{ adjacent.prev.title }}</p>
              </div>
            </router-link>
            <div v-else />

            <router-link
              v-if="adjacent.next"
              :to="`/story/${adjacent.next.id}`"
              class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:bg-surface-muted transition-colors text-right group"
            >
              <div class="flex-1 overflow-hidden">
                <p class="text-[12px] font-label-sm text-on-surface-variant uppercase">Next Post</p>
                <p class="font-label-sm text-label-sm text-on-surface truncate">{{ adjacent.next.title }}</p>
              </div>
              <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </router-link>
            <div v-else />
          </div>

          <div class="flex justify-center">
            <router-link
              to="/story"
              class="bg-primary text-white px-10 py-3 rounded-lg font-label-sm text-label-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              <span class="material-symbols-outlined">format_list_bulleted</span>
              목록으로 돌아가기
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>

  <main v-else class="py-section-padding text-center">
    <p class="text-on-surface-variant font-body-lg text-body-lg">해당 스토리를 찾을 수 없습니다.</p>
    <router-link to="/story" class="mt-4 inline-block text-primary hover:underline font-label-sm text-label-sm">
      목록으로 돌아가기
    </router-link>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchStoryById, fetchAdjacentStories } from '../api/stories'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroStory')

const route  = useRoute()
const story  = ref(null)
const adjacent = ref({ prev: null, next: null })

async function load(id) {
  story.value = await fetchStoryById(id)
  adjacent.value = story.value
    ? await fetchAdjacentStories(id)
    : { prev: null, next: null }
}

onMounted(() => load(route.params.id))
watch(() => route.params.id, id => load(id))
</script>

<style scoped>
.story-content :deep(p)          { margin-bottom: 1.25rem; }
.story-content :deep(h2)         { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.75rem; }
.story-content :deep(h3)         { font-size: 1.1rem; font-weight: 700; margin: 1.25rem 0 0.5rem; }
.story-content :deep(ul)         { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
.story-content :deep(ol)         { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
.story-content :deep(li)         { margin-bottom: 0.25rem; }
.story-content :deep(blockquote) { border-left: 4px solid #6B9E6B; padding-left: 1rem; color: #555; font-style: italic; margin: 1rem 0; }
.story-content :deep(a)          { color: #3B6E3B; text-decoration: underline; }
.story-content :deep(code)       { background: #f3f4f6; padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.9em; }
.story-content :deep(pre)        { background: #f3f4f6; padding: 1rem; border-radius: 8px; overflow-x: auto; }
</style>
