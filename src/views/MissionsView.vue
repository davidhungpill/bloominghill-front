<template>
  <main>
    <SubPageHero :src="heroSrc" />
    <BreadCrumb current="미션 및 비전" />

    <div class="bg-white py-section-padding">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div class="mb-16">
          <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4">Mission &amp; Vision</span>
          <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">
            사단법인 꽃재가 꿈꾸는<br>
            <span class="text-leaf-green">나눔과 성장의 미래</span>입니다
          </h2>
          <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
        </div>

        <!-- 기본 정보 -->
        <div class="mb-24 space-y-1">
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] bg-white p-6 rounded-lg border-b border-outline-variant/20">
            <div class="font-bold text-headline-md text-on-surface flex items-center gap-2">
              <span class="w-1 h-6 bg-leaf-green rounded-full"></span>법인명
            </div>
            <div class="text-body-lg text-on-surface-variant flex items-center">사단법인 꽃재</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] bg-white p-6 rounded-lg border-b border-outline-variant/20">
            <div class="font-bold text-headline-md text-on-surface flex items-center gap-2">
              <span class="w-1 h-6 bg-leaf-green rounded-full"></span>설립일
            </div>
            <div class="text-body-lg text-on-surface-variant flex items-center">2021년 1월 1일</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] bg-surface-container-low/50 p-6 rounded-lg">
            <div class="font-bold text-headline-md text-on-surface flex items-center gap-2">
              <span class="w-1 h-6 bg-leaf-green rounded-full"></span>원훈
            </div>
            <div class="text-body-lg text-primary font-medium italic flex items-center">"사람을 꽃피우고, 지역을 아름답게"</div>
          </div>
        </div>

        <!-- 핵심 가치 카드 -->
        <div class="mb-24">
          <div class="relative p-10 rounded-2xl bg-leaf-green/5 border border-leaf-green/10 flex flex-col gap-8 vision-card-accent overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-4 relative z-10">
              <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <span class="material-symbols-outlined text-leaf-green" style="font-size: 32px;">volunteer_activism</span>
              </div>
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 class="text-headline-lg font-bold text-on-surface whitespace-nowrap">핵심 가치</h3>
                <span class="text-leaf-green font-bold text-xs uppercase tracking-widest opacity-60">Core Values</span>
              </div>
            </div>
            <div>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <li
                  v-for="value in coreValues"
                  :key="value.title"
                  class="bg-white/80 border border-leaf-green/10 rounded-xl p-5 shadow-sm"
                >
                  <div class="flex items-start gap-3">
                    <span class="w-2 h-2 rounded-full bg-leaf-green shrink-0 mt-2.5"></span>
                    <div>
                      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                        <strong class="text-headline-md font-bold text-on-surface">{{ value.title }}</strong>
                        <span class="text-leaf-green font-bold text-xs uppercase tracking-widest opacity-60">{{ value.en }}</span>
                      </div>
                      <p class="text-body-md text-on-surface-variant leading-relaxed">{{ value.desc }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="absolute -bottom-6 -right-6 opacity-[0.03] text-leaf-green">
              <span class="material-symbols-outlined" style="font-size: 160px;">diversity_3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { useHero } from '../composables/useHero'

const { heroSrc } = useHero('heroIntro')

const coreValues = [
  { title: '배움', en: 'learning', desc: '평생 배우며 성장하는 삶을 추구합니다.' },
  { title: '나눔', en: 'sharing', desc: '이웃과 재능, 사랑을 나누며 함께합니다.' },
  { title: '성장', en: 'growth', desc: '문화와 예술로 삶의 기쁨과 가능성을 확장합니다.' },
  { title: '동행', en: 'community', desc: '세대와 계층을 넘어 함께 성장합니다.' },
]
</script>
