<template>
  <main>
    <!-- Hero -->
    <section class="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="heroSrc"
          alt="장학 사업"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-on-surface/50 to-on-surface/70"></div>
      </div>
      
    </section>

    <BreadCrumb current="장학 사업" parent="사업" />

    <!-- Main Content -->
    <section class="bg-white py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <div class="mb-16">
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6 relative inline-block pb-3">
            장학 사업
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-leaf-green"></span>
          </h2>
          <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            사단 법인 꽃재에서 우리 사회의 미래인 아동과 청소년들의 꿈을 지원하기 위한 장학 사업 활동입니다.<br class="hidden md:block">
            우리는 모든 아이들이 자신의 잠재력을 충분히 발휘할 수 있는 기회를 가져야 한다고 믿습니다.
          </p>
        </div>

        <div class="flex flex-col gap-10">
          <article
            v-for="item in programs"
            :key="item.id"
            class="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div class="md:w-1/3 min-h-[240px] relative overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">{{ item.title }}</h3>
              <div class="space-y-4">
                <div v-if="item.target" class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">대상</span>
                  <span class="font-body-md text-body-md text-on-surface">{{ item.target }}</span>
                </div>
                <div v-if="item.targetSelection" class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">대상자 선정</span>
                  <span class="font-body-md text-body-md text-on-surface">{{ item.targetSelection }}</span>
                </div>
                <div v-if="item.period" class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">기간</span>
                  <span class="font-body-md text-body-md text-on-surface">{{ item.period }}</span>
                </div>
                <div v-if="item.content" class="grid grid-cols-[120px_1fr]">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">내용</span>
                  <span class="font-body-md text-body-md text-on-surface">{{ item.content }}</span>
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

const { heroSrc } = useHero('heroScholarship')
const programs = ref([])

onMounted(async () => {
  programs.value = await fetchBusinessPrograms('scholarship')
})
</script>
