<template>
  <main>
    <SubPageHero :src="heroSrc" />
    <BreadCrumb current="연혁" />

    <section class="bg-white">
    <div class="max-w-container-max mx-auto px-gutter py-section-padding">
      <div class="flex flex-col md:flex-row gap-16 relative">
        <!-- 사이드 연도 네비 -->
        <aside class="md:w-32 flex-shrink-0">
          <div class="sticky top-40 flex flex-col items-center">
            <template v-for="(y, i) in years" :key="y">
              <a
                :href="`#year-${y}`"
                class="nav-year-btn w-16 h-16 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold text-sm text-on-surface-variant hover:border-leaf-green hover:text-leaf-green transition-all"
                :class="{ active: activeYear === y }"
                @click.prevent="scrollToYear(y)"
              >{{ y }}</a>
              <div v-if="i < years.length - 1" class="w-px h-6 bg-outline-variant"></div>
            </template>
          </div>
        </aside>

        <!-- 타임라인 콘텐츠 -->
        <div class="flex-grow">
          <div class="mb-16">
            <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4">History</span>
            <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-6">
              꽃재가 걸어온<br/><span class="text-leaf-green">희망과 나눔의 기록입니다</span>
            </h2>
            <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
          </div>

          <div class="relative">
            <section v-for="(group, idx) in historyData" :key="group.year" class="mb-20 scroll-mt-32" :id="`year-${group.year}`">
              <div class="year-indicator">
                <h3 class="text-headline-xl font-extrabold text-leaf-green mb-10">{{ group.year }}</h3>
              </div>
              <ul class="space-y-6">
                <li
                  v-for="(item, i) in group.items"
                  :key="i"
                  class="flex flex-col md:flex-row md:items-start gap-4 pb-6"
                  :class="i < group.items.length - 1 ? 'border-b border-surface-variant' : ''"
                >
                  <span class="text-leaf-green font-bold whitespace-nowrap min-w-[100px]">{{ item.date }}</span>
                  <p class="text-body-lg text-on-surface">{{ item.desc }}</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { fetchHistoryEvents } from '../api/historyEvents'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroIntro')

const historyData = ref([])
const activeYear = ref(null)

const years = computed(() => historyData.value.map(g => g.year))

onMounted(async () => {
  historyData.value = await fetchHistoryEvents()
  if (historyData.value.length) activeYear.value = historyData.value[0].year
})

function scrollToYear(year) {
  activeYear.value = year
  const el = document.getElementById(`year-${year}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
