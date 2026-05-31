<template>
  <main>
    <!-- Hero Section -->
    <section class="relative h-[300px] md:h-[400px] overflow-hidden">
      <img
        src="/static/notice.jpg"
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
import { ref } from 'vue'
import BreadCrumb from '../components/BreadCrumb.vue'

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

const faqItems = [
  {
    question: '후원금은 투명하게 쓰이나요?',
    answer: `사단법인 꽃재의 재무운영은 4단계의 감사시스템을 거칩니다.<br><br>
1. 법인이사회 감사<br>
2. 외부추천감사의 내부감사<br>
3. 외부회계법인의 감사<br>
4. 정부 감사(보건복지부, 국세청, 관할지자체 등)<br><br>
또한 연 1회 연간보고서를 발간해 진행된 사업결과를 보고합니다.`,
  },
  {
    question: '기부금은 세액공제 받을 수 있나요?',
    answer: `꽃재는 법인세법 시행령 제 36조에 근거한 사회복지법인으로 지정기부금단체이며, 다음과 같이 세액공제 혜택을 받으실 수 있습니다.<br><br>
- 본인 근로소득 금액의 30% 한도 내에서 기부금의 15% 세액공제 (1,000만원 초과분은 30%)<br>
- 법인의 경우 기부금의 10% 세액공제`,
  },
  {
    question: '기부금영수증은 어떻게 받을 수 있나요?',
    answer: `<p class="font-bold text-on-surface mb-2">1. 국세청 홈텍스 홈페이지에서 확인</p>
<p class="mb-4">- 주민번호가 등록되어있는 개인후원자의 기부내역을 국세청으로 신고해드립니다. 연초 연말정산 간소화 서비스를 통해 확인 가능합니다.</p>
<p class="font-bold text-on-surface mb-2">2. 꽃재 홈페이지에서 발급</p>
<p class="mb-4">- [마이페이지] &gt; [나의후원] &gt; [기부금영수증출력] 메뉴에서 1월 10일부터 5월 31일 사이 출력이 가능합니다.</p>
<p class="font-bold text-on-surface mb-2">3. 전화신청</p>
<p>- 기업 및 법인 후원자의 경우 종합소득세 신고 기간에 직접 연락주시면 발급해드립니다.</p>`,
  },
  {
    question: '후원자 명의를 변경하여 기부금영수증을 발급받을 수 있나요?',
    answer: `아니요. 기부금영수증은 등록된 후원자님의 명의로만 발급됩니다. 허위 발급 시 소득세법 81조에 근거하여 법적처벌을 받게 되며, 타인명의 변경은 불가능합니다.<br><br>
단, 기본공제대상자(직계존속, 형제자매 포함)의 경우 명의변경 없이도 세액공제를 받을 수 있으며, 자녀 이름으로 후원한 경우 자녀 명의로 발급된 영수증을 부모님이 공제 받을 수 있습니다.`,
  },
  {
    question: '정보를 변경하고 싶어요.',
    answer: `전화번호, 주소, 계좌번호 등 개인정보 변경을 원하실 경우 홈페이지 또는 대표전화(1577-9044)를 통해 언제든지 요청하실 수 있습니다.`,
  },
  {
    question: '현물후원이 가능한가요?',
    answer: `네, 가능합니다. 쌀, 생필품 등 후원해주신 물품은 어려운 이웃들에게 소중히 전달됩니다. 현물후원 신청 및 상세 안내는 대표번호 1577-9044로 문의 주시기 바랍니다.`,
  },
]
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
