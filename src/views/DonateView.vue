<template>
  <main class="bg-white overflow-x-hidden">

    <!-- Image Hero -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        src="/static/spring2.jpg"
        alt="후원하기"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </section>

    <!-- Text Hero -->
    <section class="pt-20 pb-16 px-margin-mobile md:px-gutter text-center bg-white">
      <div class="max-w-4xl mx-auto space-y-6">
        <h1 class="text-on-surface font-headline-xl text-headline-xl leading-tight">
          당신의 참여가<br />더 나은 내일을 만듭니다
        </h1>
        <p class="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto leading-relaxed">
          사단법인 꽃재는 투명하고 체계적인 지원을 통해 지역사회와 교육 발전에 기여합니다.<br class="hidden md:block" />
          여러분의 소중한 후원금은 목적에 맞게 정직하게 사용됩니다.
        </p>
      </div>
    </section>

    <!-- Main Content Grid -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section-padding">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- Left: Account Info -->
        <div class="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div class="p-8 md:p-12 space-y-10">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-deep-ocean text-[32px]">account_balance</span>
              <h2 class="text-on-surface font-headline-md text-headline-md">무통장 입금 안내</h2>
            </div>
            <p class="text-on-surface-variant font-body-md text-body-md leading-relaxed">
              안전하고 편리하게 후원에 동참하실 수 있습니다. 입금 후 사무국으로 연락주시면 기부금 영수증 발급을 도와드립니다.
            </p>

            <!-- Account Card -->
            <div class="rounded-xl p-8 space-y-6 border border-outline-variant/30">
              <div class="flex justify-between items-center">
                <span class="text-on-surface-variant font-body-md text-body-md font-medium">은행명</span>
                <span class="text-on-surface font-bold font-headline-md text-headline-md">농협은행</span>
              </div>
              <div class="flex justify-between items-center py-6 border-y border-outline-variant/30">
                <span class="text-on-surface-variant font-body-md text-body-md font-medium">계좌번호</span>
                <div class="flex items-center gap-3">
                  <span class="text-deep-ocean font-bold font-headline-lg text-headline-lg tracking-tight">{{ accountNumber }}</span>
                  <button
                    @click="copyAccount"
                    class="p-2 hover:bg-surface-variant rounded-full transition-colors"
                    title="계좌번호 복사"
                  >
                    <span
                      class="material-symbols-outlined text-[20px] transition-colors"
                      :class="copied ? 'text-leaf-green' : ''"
                    >{{ copied ? 'check' : 'content_copy' }}</span>
                  </button>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-on-surface-variant font-body-md text-body-md font-medium">예금주</span>
                <span class="text-on-surface font-bold font-headline-md text-headline-md">사단법인 꽃재</span>
              </div>
            </div>

            <!-- Info Box -->
            <div class="flex items-start gap-3 p-4 bg-sky-blue/5 rounded-lg border border-sky-blue/10">
              <span class="material-symbols-outlined text-sky-blue text-[20px] shrink-0 mt-0.5">info</span>
              <p class="text-on-surface-variant font-label-sm text-label-sm leading-relaxed">
                기부금 영수증 발급 및 정기 후원 문의: 02-1234-5678 (운영시간 평일 09:00 - 18:00)
              </p>
            </div>
          </div>
          <div class="h-2 bg-deep-ocean w-full"></div>
        </div>

        <!-- Right: Usage Info -->
        <div class="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-outline-variant/30 p-8 md:p-10 space-y-10">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-leaf-green text-[32px]">volunteer_activism</span>
            <h2 class="text-on-surface font-headline-md text-headline-md">후원금 사용 안내</h2>
          </div>
          <p class="text-on-surface-variant font-body-md text-body-md -mt-4">여러분의 후원금은 아래 사업들에 사용되고 있습니다.</p>

          <div class="space-y-4">
            <router-link
              v-for="usage in usageItems"
              :key="usage.path"
              :to="usage.path"
              class="flex flex-col p-6 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-colors space-y-3 bg-leaf-green/10 block"
            >
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-leaf-green text-[32px]">{{ usage.icon }}</span>
                  <span class="text-on-surface font-bold font-body-lg text-body-lg">{{ usage.title }}</span>
                </div>
                <span class="flex items-center gap-1 text-leaf-green font-medium font-label-sm text-label-sm">
                  자세히 보기
                  <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                </span>
              </div>
              <p class="text-on-surface-variant font-label-sm text-label-sm leading-relaxed">{{ usage.desc }}</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bottom Transparency Bar -->
      <div class="mt-8 bg-deep-ocean rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="space-y-6 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10">
            <span class="material-symbols-outlined text-white text-[18px]">verified</span>
            <span class="text-white font-label-sm text-label-sm font-medium">투명한 운영 약속</span>
          </div>
          <div class="space-y-4">
            <h3 class="text-white font-headline-lg text-headline-lg">정직하고 투명하게 보고합니다</h3>
            <p class="text-white/90 font-body-md text-body-md leading-relaxed">
              여러분의 후원 내역과 사업 집행 결과는 매년 공식 홈페이지와 국세청을 통해 투명하게 공개되며,
              외부 감사를 통해 신뢰를 지켜갑니다.
            </p>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const accountNumber = '301-1234-5678-01'
const copied = ref(false)

function copyAccount() {
  navigator.clipboard.writeText(accountNumber).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

const usageItems = [
  {
    icon: 'music_note',
    title: '오케스트라 사업',
    desc: '문화예술 교육을 통해 청소년들의 꿈을 키우고 지역사회에 음악적 감동을 선사합니다.',
    path: '/orchestra',
  },
  {
    icon: 'home',
    title: '이웃 사랑 나눔 사업',
    desc: '복지 사각지대의 소외계층에게 생필품과 긴급 생계비를 지원하여 기본적인 삶의 질을 높입니다.',
    path: '/nanum',
  },
  {
    icon: 'school',
    title: '장학사업',
    desc: '경제적 어려움 속에서도 학업에 전념할 수 있도록 유능한 인재들을 발굴하고 장학금을 지원합니다.',
    path: '/scholarship',
  },
]
</script>
