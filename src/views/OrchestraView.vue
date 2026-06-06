<template>
  <main>
    <!-- Hero -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        :src="heroSrc"
        alt="뉴왕십리 오케스트라"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-deep-ocean/30 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </section>

    <BreadCrumb current="오케스트라" parent="사업" />

    <!-- Main Content -->
    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <div class="mb-16">
          <h2 class="font-headline-lg text-headline-lg text-on-surface inline-block relative pb-4">
            오케스트라 사업
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-leaf-green"></span>
          </h2>
          <p class="text-on-surface-variant font-body-lg text-body-lg mt-6">
            사단법인 꽃재의 "뉴왕십리 오케스트라"가 진행하는 사업 활동입니다.
          </p>
        </div>

        <div class="space-y-12">
          <article
            v-for="item in programs"
            :key="item.id"
            class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[320px] border border-outline-variant/20 soft-shadow hover-lift"
          >
            <div class="md:w-[40%] min-h-[280px] relative overflow-hidden group">
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-8">{{ item.title }}</h3>
              <div class="space-y-3 font-body-md text-body-md">
                <div v-if="item.target" class="flex">
                  <div class="w-28 shrink-0 font-semibold text-on-surface">대상</div>
                  <div class="text-on-surface-variant">{{ item.target }}</div>
                </div>
                <div v-if="item.targetSelection" class="flex">
                  <div class="w-28 shrink-0 font-semibold text-on-surface">대상자 선정</div>
                  <div class="text-on-surface-variant">{{ item.targetSelection }}</div>
                </div>
                <div v-if="item.period" class="flex">
                  <div class="w-28 shrink-0 font-semibold text-on-surface">시기</div>
                  <div class="text-on-surface-variant">{{ item.period }}</div>
                </div>
                <div v-if="item.content" class="flex">
                  <div class="w-28 shrink-0 font-semibold text-on-surface">내용</div>
                  <div class="text-on-surface-variant">{{ item.content }}</div>
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

const { heroSrc } = useHero('heroOrchestra')
const programs = ref([])

onMounted(async () => {
  programs.value = await fetchBusinessPrograms('orchestra')
})
</script>
