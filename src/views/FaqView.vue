<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="자주 묻는 질문"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
    </section>

    <BreadCrumb current="자주 묻는 질문" parent="소식" />

    <!-- Main Content -->
    <section class="bg-white min-h-screen py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <!-- Section Header -->
        <div class="mb-16">
          <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4">FAQ</span>
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-4">자주 묻는 질문</h2>
          <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
          <p class="text-on-surface-variant font-body-md text-body-md mt-6">사단 법인 꽃재에 대해 궁금하신 점들을 확인해 보세요.</p>
        </div>

        <!-- FAQ Accordion -->
        <div class="space-y-2 max-w-5xl mx-auto">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="border-b border-outline-variant group"
          >
            <button
              class="w-full flex justify-between items-center py-8 text-left focus:outline-none transition-all"
              @click="toggle(index)"
            >
              <div class="flex gap-6 items-start">
                <span class="text-leaf-green font-bold font-headline-md text-headline-md leading-none pt-1">Q.</span>
                <span class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">{{ item.question }}</span>
              </div>
              <span
                class="material-symbols-outlined text-outline text-3xl shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': openIndex === index }"
              >expand_more</span>
            </button>
            <div class="accordion-content px-12" :class="{ open: openIndex === index }">
              <div
                class="text-on-surface-variant font-body-lg text-body-lg leading-relaxed bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 mb-8"
                v-html="item.answer"
              ></div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-24 p-12 bg-surface-muted rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-outline-variant/30 shadow-sm">
          <div class="max-w-3xl">
            <h3 class="font-headline-md text-headline-md text-on-surface mb-3">찾으시는 질문이 없으신가요?</h3>
            <p class="text-on-surface-variant font-body-lg text-body-lg">꽃재 사무국으로 연락주시면 친절하게 답변해 드리겠습니다.</p>
          </div>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="tel:1577-9044"
              class="flex items-center gap-2 bg-white border-2 border-deep-ocean text-deep-ocean px-8 py-4 rounded-xl font-label-sm text-label-sm hover:bg-surface-dim transition-all active:scale-95 shadow-sm"
            >
              <span class="material-symbols-outlined">call</span>
              1577-9044
            </a>
            <a
              href="#"
              class="flex items-center gap-2 bg-warm-accent text-white px-8 py-4 rounded-xl font-label-sm text-label-sm hover:opacity-90 transition-all active:scale-95 shadow-md"
            >
              <span class="material-symbols-outlined">chat</span>
              카카오톡 문의
            </a>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchFaqs } from '../api/faq'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroFaq')

const openIndex = ref(null)
const faqItems = ref([])

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

onMounted(async () => {
  faqItems.value = await fetchFaqs()
})
</script>

<style scoped>
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.accordion-content.open {
  max-height: 800px;
}
</style>
