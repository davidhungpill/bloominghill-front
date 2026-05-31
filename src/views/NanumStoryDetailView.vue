<template>
  <main v-if="story">
    <!-- Hero Banner -->
    <section class="relative min-h-[200px] md:min-h-[400px] overflow-hidden">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAZAFA2xBboGAIVypzB3t0QI1Gy5nqsWUeV6YliDb7JiVw8R-81zzZeNB20egNI4grq-kf3mHW_LE-xZCh90u37Jj_RrGOmNMnIWiIMwgAr_FgPuyezTa3TzEcg6VOqAC84nI0np8gCxk5GCoFc3ns93gTM2brYZ265z_iZ3h1OtTn42oArCA3Q3yguTGPk2-9vbOiztpGOzi2TCXRk1S6OKMCBjpiDjFNpZGfv2BkHrowsHQMaYEoYfI09YHzm6gC79c00BKAVKeM"
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
              <p class="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">{{ story.content }}</p>

              <div class="bg-surface-muted p-8 rounded-2xl border-l-4 border-leaf-green">
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
          <div class="px-8 md:px-12 pb-12 flex flex-wrap gap-2">
            <span
              v-for="tag in story.tags"
              :key="tag"
              class="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[13px] font-label-sm"
            >{{ tag }}</span>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from '../components/BreadCrumb.vue'
import { getStoryById, getAdjacentStories } from '../data/stories.js'

const route = useRoute()
const story = computed(() => getStoryById(route.params.id))
const adjacent = computed(() =>
  story.value ? getAdjacentStories(route.params.id) : { prev: null, next: null }
)
</script>
