<template>
  <main v-if="post">
    <!-- Hero Section -->
    <section class="relative w-full h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="카페 마노아"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/10"></div>
    </section>

    <BreadCrumb current="카페 마노아" parent="우리 이야기" />

    <!-- Content -->
    <section class="bg-surface-container-lowest pb-section-padding">
      <div class="max-w-[1000px] mx-auto px-margin-mobile md:px-gutter pt-10">

        <!-- Post Header -->
        <div class="border-b border-outline-variant pb-8 mb-12">
          <span class="inline-block bg-primary-container/10 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm mb-4">
            Cafe Manoa
          </span>
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 leading-tight text-on-surface">
            {{ post.title }}
          </h1>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm">
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">calendar_today</span>
                {{ post.date }}
              </span>
              <span class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px]">visibility</span>
                {{ post.views }}
              </span>
            </div>
            <button class="p-2 hover:bg-surface-container rounded-full transition-colors flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">share</span>
            </button>
          </div>
        </div>

        <!-- Description -->
        <div v-if="post.desc" class="mb-12 text-on-surface font-body-lg text-body-lg leading-relaxed whitespace-pre-line">
          {{ post.desc }}
        </div>

        <!-- Article Body: stacked content images -->
        <article class="flex flex-col gap-12 items-center">
          <div
            v-for="(img, i) in post.contentImages"
            :key="i"
            class="w-full shadow-lg rounded-xl overflow-hidden border border-outline-variant"
          >
            <img :src="img" :alt="`카페 마노아 이미지 ${i + 1}`" class="w-full h-auto" />
          </div>
        </article>

        <!-- Back to List -->
        <div class="mt-16 flex justify-center">
          <router-link
            to="/cafe"
            class="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-lg font-label-sm text-label-sm hover:bg-leaf-green transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span class="material-symbols-outlined text-[20px]">list</span>
            목록으로 돌아가기
          </router-link>
        </div>

      </div>
    </section>
  </main>

  <main v-else class="py-section-padding text-center">
    <p class="text-on-surface-variant font-body-lg text-body-lg">해당 게시물을 찾을 수 없습니다.</p>
    <router-link to="/cafe" class="mt-4 inline-block text-primary hover:underline font-label-sm text-label-sm">
      목록으로 돌아가기
    </router-link>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchCafePostById } from '../api/cafe'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroCafe')

const route = useRoute()
const post = ref(null)

async function load(id) {
  post.value = await fetchCafePostById(id)
}

onMounted(() => load(route.params.id))
watch(() => route.params.id, id => load(id))
</script>
