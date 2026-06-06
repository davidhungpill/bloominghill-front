<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden flex items-center justify-center">
      <img
        v-if="heroSrc"
        :src="heroSrc"
        alt="기부금 영수증 안내"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-deep-ocean/30"></div>
    </section>

    <BreadCrumb current="기부금 영수증 안내" parent="후원" />

    <!-- Main Content -->
    <section class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">

      <!-- Section Header -->
      <div class="mb-12">
        <h2 class="font-headline-lg text-headline-lg text-on-surface mb-6">기부금 영수증 안내</h2>
        <div class="p-8 bg-surface-muted rounded-xl border-l-4 border-leaf-green">
          <p class="font-body-lg text-body-lg text-on-surface leading-relaxed">
            사단법인 꽃재는 사회복지법인 지정기부금단체로서<br class="hidden md:block" />
            개인 및 기업·단체 후원자님께 <strong>기부금영수증</strong>을 발급해드리고 있습니다.
          </p>
        </div>
      </div>

      <!-- Info Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

        <!-- 법인·기업 후원자 -->
        <div class="bg-white border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 p-8 rounded-2xl flex flex-col h-full">
          <div class="mb-6 flex items-center gap-3">
            <span class="material-symbols-outlined text-leaf-green text-3xl">corporate_fare</span>
            <h3 class="font-headline-md text-headline-md text-deep-ocean">법인 · 기업 후원자 안내</h3>
          </div>
          <p class="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow leading-relaxed">
            입금자명은 반드시 사업자등록증 상의 명칭과 동일하게 기재해 주세요.
            처음 후원하셨다면 사업자등록증을 이메일로 발송해 주시기 바랍니다.
          </p>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-white border border-outline-variant rounded-lg">
              <span class="material-symbols-outlined text-primary">mail</span>
              <span class="font-body-md text-body-md font-semibold">이메일: {{ receiptEmail }}</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-white border border-outline-variant rounded-lg">
              <span class="material-symbols-outlined text-primary">language</span>
              <span class="font-body-md text-body-md font-semibold">홈페이지: 기부금영수증 신청 게시판</span>
            </div>
            <div class="flex items-center gap-3 p-3 bg-white border border-outline-variant rounded-lg">
              <span class="material-symbols-outlined text-primary">chat_bubble</span>
              <span class="font-body-md text-body-md font-semibold">카카오톡 채널: {{ kakaoChannel }}</span>
            </div>
          </div>
        </div>

        <!-- 개인 후원자 -->
        <div class="bg-white border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 p-8 rounded-2xl flex flex-col h-full">
          <div class="mb-6 flex items-center gap-3">
            <span class="material-symbols-outlined text-leaf-green text-3xl">person</span>
            <h3 class="font-headline-md text-headline-md text-deep-ocean">개인 후원자 안내</h3>
          </div>
          <p class="text-on-surface-variant font-body-md text-body-md mb-6 leading-relaxed">
            후원내역은 <strong>연말정산 간소화 서비스</strong>에 등록되어,
            국세청 홈택스를 통해 자동 확인 가능합니다.
          </p>
          <div class="bg-primary/5 p-5 rounded-xl border border-primary/20 mb-6">
            <p class="font-label-sm text-label-sm text-primary mb-3">※ 필수 입력 정보</p>
            <ul class="grid grid-cols-2 gap-y-2 gap-x-4 font-body-md text-body-md text-on-surface-variant">
              <li v-for="field in requiredFields" :key="field" class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-leaf-green shrink-0"></span>
                {{ field }}
              </li>
            </ul>
          </div>
          <p class="font-label-sm text-label-sm text-on-surface-variant/80 italic mt-auto leading-relaxed">
            단체명 입금 후 개별 발급 원할 시 '단체명_개인후원내역' 양식을 작성해 메일로 보내주세요.
          </p>
        </div>

      </div>

      <!-- Inquiry Buttons -->
      <div class="pt-12 border-t border-outline-variant">
        <h3 class="font-headline-md text-headline-md text-center text-on-surface mb-8">궁금한 점이 있으신가요?</h3>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a
            :href="`tel:${phone}`"
            class="flex items-center justify-center gap-3 bg-white border-2 border-deep-ocean text-deep-ocean font-bold font-label-sm text-label-sm px-8 py-4 rounded-xl hover:bg-deep-ocean/5 transition-all active:scale-95"
          >
            <span class="material-symbols-outlined">call</span>
            전화 문의 {{ phone }}
          </a>
          <a
            :href="kakaoChannelUrl"
            class="flex items-center justify-center gap-3 bg-[#FAE100] text-[#3C1E1E] font-bold font-label-sm text-label-sm px-8 py-4 rounded-xl hover:brightness-95 transition-all active:scale-95"
          >
            <span class="material-symbols-outlined">chat_bubble</span>
            카카오톡 상담하기
          </a>
        </div>
      </div>

    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { useHero } from '../composables/useHero'
import { fetchSiteConfig, getSiteText } from '../api/siteConfig'

const { heroSrc } = useHero('heroDonateCert')

const receiptEmail    = ref('blooming5424@naver.com')
const kakaoChannel    = ref('@꽃재복지재단')
const kakaoChannelUrl = ref('#')
const phone           = ref('02-2299-5424')

onMounted(async () => {
  const config = await fetchSiteConfig()
  receiptEmail.value    = getSiteText(config, 'receiptEmail')
  kakaoChannel.value    = getSiteText(config, 'kakaoChannel')
  kakaoChannelUrl.value = getSiteText(config, 'kakaoChannelUrl')
  phone.value           = getSiteText(config, 'phone')
})

const requiredFields = ['성명', '주민번호 13자리', '후원금액', '휴대전화번호']
</script>
