<template>
  <main>
    <SubPageHero />
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
            <div class="text-body-lg text-on-surface-variant flex items-center">2021년 3월 1일</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] bg-surface-container-low/50 p-6 rounded-lg">
            <div class="font-bold text-headline-md text-on-surface flex items-center gap-2">
              <span class="w-1 h-6 bg-leaf-green rounded-full"></span>원훈
            </div>
            <div class="text-body-lg text-primary font-medium italic flex items-center">"네 이웃을 네 몸과 같이 사랑하라"</div>
          </div>
        </div>

        <!-- 설립이념 & 비전 카드 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div class="relative p-10 rounded-2xl bg-leaf-green/5 border border-leaf-green/10 flex flex-col gap-6 vision-card-accent overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-leaf-green" style="font-size: 32px;">volunteer_activism</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-headline-lg font-bold text-on-surface">설립이념</h3>
                <span class="text-leaf-green font-bold text-xs uppercase tracking-widest opacity-60">Mission</span>
              </div>
              <p class="text-headline-md leading-relaxed text-on-surface-variant font-medium">
                "지역사회와 이웃에게 하나님의 은혜와 사랑을 나눈다."
              </p>
            </div>
            <div class="absolute -bottom-6 -right-6 opacity-[0.03] text-leaf-green">
              <span class="material-symbols-outlined" style="font-size: 160px;">favorite</span>
            </div>
          </div>

          <div class="relative p-10 rounded-2xl bg-leaf-green/5 border border-leaf-green/10 flex flex-col gap-6 vision-card-accent overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-leaf-green" style="font-size: 32px;">visibility</span>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-headline-lg font-bold text-on-surface">비전</h3>
                <span class="text-leaf-green font-bold text-xs uppercase tracking-widest opacity-60">Vision</span>
              </div>
              <p class="text-headline-md leading-relaxed text-on-surface-variant font-medium">
                "지역사회의 도움이 필요한 이웃들을 찾아 지원하는 사업들을 발굴하고 지원한다."
              </p>
            </div>
            <div class="absolute -bottom-6 -right-6 opacity-[0.03] text-leaf-green">
              <span class="material-symbols-outlined" style="font-size: 160px;">explore</span>
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
</script>
