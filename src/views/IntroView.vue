<template>
  <main>
    <SubPageHero />
    <BreadCrumb current="이사장 인사말" />

    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div class="mb-12">
          <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4">Chairman's Message</span>
          <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">
            "함께 배우고 성장하며,<br>
            <span class="text-leaf-green">나눔의 기쁨</span>을 누리는 여정에 동행하겠습니다."
          </h2>
          <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
        </div>

        <div class="flex flex-col gap-12">
          <div class="greeting-text text-on-surface-variant font-body-lg text-body-lg space-y-6">
            <p>사단법인 꽃재를 방문해 주신 여러분께 진심으로 감사드립니다.</p>
            <p>사단법인 꽃재는 꽃재교회의 다양한 인프라를 지역사회와 공유하여 지역주민에게 평생교육 기회를 확대하고, 평생학습 시대를 준비하도록 섬기는 비영리 단체입니다. 디지털 전환, 진로·직업의 다양화, 고령화 등 빠르게 변화하는 사회 속에서 누구나 미래를 준비할 수 있도록 맞춤형 교육과 건강한 학습문화를 만들어가고 있습니다.</p>
            <p>이를 통해 지역사회의 교육·문화 활성화는 물론, 교육·문화 소외계층에 대한 지원을 확대하고 지역주민과의 따뜻한 소통과 관계를 기반으로 지속가능한 지역사회를 이루고자 합니다. 사단법인 꽃재는 이러한 비전을 품고 2020년 6월 1일 설립되었습니다.</p>
            <p>현재 꽃재는 우수한 강사진과 교육 환경을 바탕으로 다양한 교육·문화 사업을 활활히 운영하고 있습니다. 꽃재 평생교육원의 교양 강의를 비롯하여, 뉴왕십리 오케스트라를 통한 자선 공연 및 음악 교육, 지역 유관 단체와의 협력 봉사 활동, 지역주민의 쉼을 위한 카페 마노아 운영 및 나눔 사업, 다문화·한부모 가정 자녀를 위한 교육 지원, 취약계층 아동·청소년 장학 사업, 독거 어르신을 위한 돌봄과 지원까지 폭넓은 영역에서 따뜻한 배움과 나눔을 실천하고 있습니다.</p>
            <p>21세기는 교육과 문화, 그리고 평생학습의 시대입니다. 사단법인 꽃재는 지역사회의 필요와 주민 한 분 한 분의 삶이 조화롭게 성장할 수 있도록 든든한 학습 동반자가 되겠습니다. 열린 교육과 문화의 공간, 사단법인 꽃재에 오신 것을 진심으로 환영합니다. 앞으로도 함께 배우고 성장하며, 나눔의 기쁨을 누리는 여정에 동행하겠습니다.</p>
          </div>

          <div class="flex flex-col md:flex-row items-center md:items-end justify-end gap-6 mt-8">
            <div class="text-right flex flex-col items-end">
              <div class="flex flex-col gap-2 mb-4">
                <span class="text-on-surface-variant font-label-sm">사단법인 꽃재 이사장</span>
                <span class="text-headline-md font-bold text-on-surface">김 성 복</span>
              </div>
              <img
                alt="Chairman Kim Seong-bok"
                class="w-48 rounded-lg shadow-md border border-outline-variant/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa7OiE2utlHe5mTuE1bnPmDyUEp09tlmx89yyD9vSmVtFhtT9OO2xIJsn3UZQISZswqtbMoY55zIbFPlWoERqk6ci0eFqDQQP0uy23FM2kyofhXCr5uNWud0DzlQ8Pp9YdJNbVcak4XPCS0C_-HOn6Ba3ndfhn1knjpOtK1F6D1UdAl8rQg-4Wuj5ck_wsCPi_sSAU48nt3zq4Yht8GYH_brwKUUfaNKTd8CFSz1UTfy1acB-3iJSJmK4k2ko_UnE23dxoJTvk7o97"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
</script>
