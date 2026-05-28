<template>
  <main>
    <!-- Hero -->
    <section class="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="/static/students.jpeg"
          alt="장학 사업"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-on-surface/50 to-on-surface/70"></div>
      </div>
      <div class="relative z-10 text-center px-margin-mobile max-w-4xl">
        <h1 class="font-headline-xl text-headline-xl text-white mb-4">장학 사업</h1>
        <p class="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">
          경제적 어려움 속에서도 꿈을 잃지 않는 인재들을 발굴하여 학업에 전념할 수 있도록 돕습니다.
        </p>
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

          <!-- 장학금 지원 사업 -->
          <article class="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="md:w-1/3 min-h-[240px] relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTOgkOv3oCZhtExFgWMhLGnnRa4h9jkoVvavD3SUgx1Vajsw7O0NeuhfME0WY_WmzyPQ3R63G9-OppIuwyw6MPBz1xoNuJ7CnfZ8VwrTWDKY-e3s-mrSb1XxzTwKPa3VAh3PYvqa_DTo8jxoDfPIFJeHaQiHQyhMcBy16QslyhGhhSl2cux9pxt9Ljwvcn7eobyLD59u8I85qXknpTBEL9oNEc-XgZfQuA-bEVXIHOwZHpwJ6xCltRpoLwQ17i3Kh_r1d6tZDKSjh"
                alt="장학금 지원 사업"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">장학금 지원 사업</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">대상</span>
                  <span class="font-body-md text-body-md text-on-surface">한부모 자녀, 차상위 계층 중고등학생</span>
                </div>
                <div class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">대상자 선정</span>
                  <span class="font-body-md text-body-md text-on-surface">도선고등학교, 도선동 주민센터</span>
                </div>
                <div class="grid grid-cols-[120px_1fr]">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">내용</span>
                  <span class="font-body-md text-body-md text-on-surface">재정 지원</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 아동 청소년 지원 사업 -->
          <article class="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all duration-300">
            <div class="md:w-1/3 min-h-[240px] relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKiIubHcvJAWvk5W2VMol2lduYPI_ZQHudQITXpJJJoIKrSyewoX3Id4Fsk1aX6EXTNwe8XGhDaRBz7pmstP6yg7DDaqY6zabfcT-3GaP9PpjslvF-WNoTNttyjx_swFuHtVqEIS6CgYSxPPF6olt4cBB4gXoDQIMuKo_c0ANdxTom9y7JUcayr3Dx09SNCJbq3D9habaAAQEqc5Vl-o22b_VZC_1SFV6mPMNtUydKKP3ghkZb0sULo_LdcXadLXUf7wVBUipxkgtX"
                alt="아동 청소년 지원 사업"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">아동 청소년 지원 사업</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">대상</span>
                  <span class="font-body-md text-body-md text-on-surface">수급자 자녀 아동/청소년</span>
                </div>
                <div class="grid grid-cols-[120px_1fr] border-b border-outline-variant/20 pb-3">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">대상자 선정</span>
                  <span class="font-body-md text-body-md text-on-surface">도선동 주민센터, 이든아이</span>
                </div>
                <div class="grid grid-cols-[120px_1fr]">
                  <span class="font-label-sm text-label-sm text-on-surface-variant">내용</span>
                  <span class="font-body-md text-body-md text-on-surface">우유 365일 배달, 보호종료아동 정기 지원</span>
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
import BreadCrumb from '../components/BreadCrumb.vue'
</script>
