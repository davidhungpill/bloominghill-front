<template>
  <main v-if="article">
    <!-- Hero Section -->
    <section class="w-full h-[400px] relative overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="언론 보도자료"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/20"></div>
    </section>

    <BreadCrumb current="언론 보도자료" parent="꽃재 이야기" />

    <!-- Main Content -->
    <section class="bg-surface-container-lowest py-section-padding">
      <div class="max-w-4xl mx-auto px-margin-mobile md:px-gutter">
        <article class="space-y-6">
          <!-- Post Header -->
          <div class="flex flex-col gap-4">
            <span :class="article.typeColor" class="font-label-sm text-label-sm">[{{ article.type }}]</span>
            <h1 class="font-headline-xl text-headline-xl text-on-surface leading-tight">{{ article.title }}</h1>
            <div class="flex items-center gap-6 text-on-surface-variant/70 border-b border-outline-variant/30 pb-6">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[20px]">calendar_today</span>
                <span class="font-label-sm text-label-sm">{{ article.date }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[20px]">visibility</span>
                <span class="font-label-sm text-label-sm">{{ article.views?.toLocaleString() }}</span>
              </div>
            </div>
            <div class="h-1.5 w-full bg-leaf-green rounded-full"></div>
          </div>

          <!-- Featured Image -->
          <div v-if="article.featuredImage" class="rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 my-8">
            <img :src="article.featuredImage" alt="대표 이미지" class="w-full h-auto object-cover" />
          </div>

          <!-- Body -->
          <div
            class="rich-content space-y-6"
            v-html="article.body"
          ></div>

          <!-- Attachments -->
          <section v-if="article.attachments?.length" class="mt-16 p-6 bg-surface-muted rounded-xl border border-outline-variant/30">
            <h3 class="font-label-sm text-label-sm text-on-surface mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">attach_file</span>
              첨부파일 ({{ article.attachments.length }})
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(file, i) in article.attachments"
                :key="i"
                class="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg group hover:border-primary transition-colors border border-transparent"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <span class="material-symbols-outlined text-on-surface-variant">{{ file.icon || 'description' }}</span>
                  <span class="font-body-md text-body-md text-on-surface truncate">{{ file.name }}</span>
                </div>
                <div class="flex items-center gap-4">
                  <span class="font-label-sm text-label-sm text-on-surface-variant/50">{{ file.size }}</span>
                  <a
                    :href="file.url || '#'"
                    class="flex items-center gap-1 text-primary hover:underline font-label-sm text-label-sm"
                  >
                    <span class="material-symbols-outlined text-[18px]">download</span>
                    다운로드
                  </a>
                </div>
              </li>
            </ul>
          </section>

          <!-- Navigation -->
          <nav class="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col gap-4">
            <div class="flex flex-col md:flex-row gap-4 justify-between border-b border-outline-variant/30 pb-8">
              <router-link
                v-if="adjacent.prev"
                :to="'/press/' + adjacent.prev.id"
                class="flex flex-1 items-center gap-4 group p-4 rounded-lg hover:bg-surface-container transition-colors"
              >
                <span class="material-symbols-outlined text-on-surface-variant group-hover:-translate-x-1 transition-transform">arrow_back</span>
                <div>
                  <span class="block font-label-sm text-label-sm text-on-surface-variant/50">이전글</span>
                  <span class="block font-body-md text-body-md text-on-surface font-semibold truncate">{{ adjacent.prev.title }}</span>
                </div>
              </router-link>
              <div v-else class="flex-1"></div>

              <router-link
                v-if="adjacent.next"
                :to="'/press/' + adjacent.next.id"
                class="flex flex-1 items-center justify-end gap-4 text-right group p-4 rounded-lg hover:bg-surface-container transition-colors"
              >
                <div>
                  <span class="block font-label-sm text-label-sm text-on-surface-variant/50">다음글</span>
                  <span class="block font-body-md text-body-md text-on-surface font-semibold truncate">{{ adjacent.next.title }}</span>
                </div>
                <span class="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </router-link>
              <div v-else class="flex-1"></div>
            </div>
            <div class="flex justify-center mt-4">
              <router-link
                to="/press"
                class="px-8 py-3 border-2 border-deep-ocean text-deep-ocean rounded-lg font-label-sm text-label-sm hover:bg-deep-ocean hover:text-on-primary transition-all duration-300"
              >
                목록으로
              </router-link>
            </div>
          </nav>
        </article>
      </div>
    </section>
  </main>

  <main v-else-if="notFound" class="py-section-padding text-center">
    <p class="text-on-surface-variant font-body-lg text-body-lg">해당 기사를 찾을 수 없습니다.</p>
    <router-link to="/press" class="mt-4 inline-block text-primary hover:underline font-label-sm text-label-sm">
      목록으로 돌아가기
    </router-link>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchPressArticleById, fetchAdjacentPressArticles } from '../api/press'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroPress')
const route = useRoute()
const article = ref(null)
const adjacent = ref({ prev: null, next: null })
const notFound = ref(false)

async function load(id) {
  article.value = null
  notFound.value = false
  const item = await fetchPressArticleById(id)
  if (item) {
    article.value = item
    adjacent.value = await fetchAdjacentPressArticles(id)
  } else {
    notFound.value = true
  }
}

onMounted(() => load(route.params.id))
watch(() => route.params.id, id => load(id))
</script>
