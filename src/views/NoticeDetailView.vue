<template>
  <main v-if="notice">
    <!-- Hero Section -->
    <section class="relative w-full h-[300px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="공지사항"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/10"></div>
    </section>

    <BreadCrumb current="공지사항" parent="소식" />

    <div class="bg-white">
    <div class="mx-auto px-margin-mobile md:px-gutter py-16 max-w-4xl">
      <!-- Content Header -->
      <div class="mb-12">
        <span class="text-leaf-green font-label-sm text-label-sm tracking-widest block mb-3">NOTICE</span>
        <h2 class="font-headline-lg text-headline-lg text-on-surface leading-tight mb-6">{{ notice.title }}</h2>
        <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm border-b border-outline-variant pb-6">
          <span class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
            {{ notice.date }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-outline">visibility</span>
            조회수 {{ notice.views?.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- Article Body -->
      <article
        class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed space-y-8 mb-16"
        v-html="notice.body"
      ></article>

      <!-- Attachments -->
      <section v-if="notice.attachments?.length" class="border-t border-b border-outline-variant py-8 flex flex-col gap-4">
        <div class="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant font-bold">
          <span class="material-symbols-outlined text-outline">attach_file</span>
          첨부파일
        </div>
        <div class="flex flex-col gap-2">
          <a
            v-for="(file, i) in notice.attachments"
            :key="i"
            :href="file.url || '#'"
            class="flex items-center justify-between bg-surface-container px-5 py-3 rounded-lg hover:bg-surface-dim transition-colors group"
          >
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined text-outline group-hover:text-leaf-green">{{ file.icon || 'description' }}</span>
              <span class="font-label-sm text-label-sm text-on-surface">{{ file.name }}</span>
            </span>
            <span class="text-on-surface-variant text-[12px] opacity-60">{{ file.size }}</span>
          </a>
        </div>
      </section>

      <!-- Bottom Navigation -->
      <div class="mt-16 flex flex-row justify-between items-center gap-6 w-full">
        <router-link
          v-if="adjacent.prev"
          :to="'/notice/' + adjacent.prev.id"
          class="flex items-center gap-2 text-on-surface-variant hover:text-leaf-green transition-colors font-label-sm text-label-sm w-1/4 justify-start"
        >
          <span class="material-symbols-outlined">chevron_left</span>
          이전글
        </router-link>
        <span v-else class="w-1/4"></span>

        <router-link
          to="/notice"
          class="bg-on-surface text-white px-10 py-2.5 rounded font-label-sm text-label-sm hover:bg-leaf-green transition-colors"
        >
          목록으로
        </router-link>

        <router-link
          v-if="adjacent.next"
          :to="'/notice/' + adjacent.next.id"
          class="flex items-center gap-2 text-on-surface-variant hover:text-leaf-green transition-colors font-label-sm text-label-sm w-1/4 justify-end"
        >
          다음글
          <span class="material-symbols-outlined">chevron_right</span>
        </router-link>
        <span v-else class="w-1/4"></span>
      </div>
    </div>
    </div>
  </main>

  <main v-else-if="notFound" class="py-section-padding text-center">
    <p class="text-on-surface-variant font-body-lg text-body-lg">해당 공지사항을 찾을 수 없습니다.</p>
    <router-link to="/notice" class="mt-4 inline-block text-primary hover:underline font-label-sm text-label-sm">
      목록으로 돌아가기
    </router-link>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchNoticeById, fetchAdjacentNotices } from '../api/notices'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroNotice')
const route = useRoute()
const notice = ref(null)
const adjacent = ref({ prev: null, next: null })
const notFound = ref(false)

async function load(id) {
  notice.value = null
  notFound.value = false
  const item = await fetchNoticeById(id)
  if (item) {
    notice.value = item
    adjacent.value = await fetchAdjacentNotices(id)
  } else {
    notFound.value = true
  }
}

onMounted(() => load(route.params.id))
watch(() => route.params.id, id => load(id))
</script>
