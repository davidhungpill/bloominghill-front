<template>
  <main>
    <!-- Hero -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        :src="heroSrc"
        alt="이웃사랑 나눔 사업"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
      
    </section>

    <BreadCrumb current="이웃사랑 나눔사업" parent="사업" />

    <!-- Main Content -->
    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <div class="mb-12">
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">이웃사랑 나눔 사업</h2>
          <div class="w-16 h-1 bg-leaf-green"></div>
          <p class="mt-4 font-body-md text-body-md text-on-surface-variant">
            사단 법인 꽃재에서 지역 주민들을 섬기기 위한 이웃 사랑 나눔 사업 활동입니다.
          </p>
        </div>

        <div class="space-y-8">
          <article
            v-for="item in programs"
            :key="item.id"
            class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift"
          >
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">{{ item.title }}</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div v-if="item.target" class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">{{ item.target }}</span>
                </div>
                <div v-if="item.targetSelection" class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">{{ item.targetSelection }}</span>
                </div>
                <div v-if="item.period" class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">기간</span>
                  <span class="text-on-surface">{{ item.period }}</span>
                </div>
                <div v-if="item.content" class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">{{ item.content }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchBusinessPrograms } from '../api/businessPrograms'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroNanum')
const programs = ref([])

onMounted(async () => {
  programs.value = await fetchBusinessPrograms('nanum')
})
</script>

<style scoped>
.hero-text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
