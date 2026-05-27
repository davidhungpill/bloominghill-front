<template>
  <main>
    <SubPageHero />
    <BreadCrumb current="조직도" />

    <section class="bg-white">
    <div class="max-w-container-max mx-auto px-gutter py-section-padding">
      <!-- 인트로 -->
      <div class="mb-20 max-w-4xl text-left">
        <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4">Organization Structure</span>
        <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">
          "전문성과 투명성을 갖춘,<br/>
          <span class="text-leaf-green">나눔과 성장을 위한 체계적인 조직입니다."</span>
        </h2>
        <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mt-8">
          사단법인 꽃재는 공정한 의사결정과 전문적인 사업 수행을 위해 이사회 중심의 거버넌스와 분야별 전문 사업부를 운영하고 있습니다.
        </p>
      </div>

      <!-- 조직도 -->
      <div class="relative py-10 bg-surface-container-low/50 rounded-3xl shadow-sm p-8 md:p-16 mb-24 overflow-x-auto">
        <div class="min-w-[800px] flex flex-col items-center">
          <!-- Level 1: 이사장 -->
          <div class="relative z-10 w-64 p-6 bg-deep-ocean text-white rounded-xl text-center shadow-lg node-hover">
            <span class="block text-label-sm opacity-80 mb-1">Top Level</span>
            <h3 class="font-headline-md text-headline-md">이사장</h3>
          </div>
          <div class="org-line-v"></div>

          <!-- Level 2 -->
          <div class="relative w-full">
            <div class="flex justify-center items-start gap-12">
              <div class="flex flex-col items-center">
                <div class="org-line-h w-16 mb-4"></div>
                <div class="w-56 p-5 border-2 border-leaf-green bg-white text-leaf-green rounded-xl text-center font-bold shadow-sm node-hover">
                  이사회
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-64 p-6 bg-leaf-green text-white rounded-xl text-center shadow-md node-hover">
                  <span class="block text-label-sm opacity-80 mb-1">Chief Executive</span>
                  <h3 class="font-headline-md text-headline-md">상임이사</h3>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div class="org-line-h w-16 mb-4"></div>
                <div class="w-56 p-5 border-2 border-outline-variant bg-surface-muted text-on-surface-variant rounded-xl text-center font-bold shadow-sm node-hover">
                  감사
                </div>
              </div>
            </div>
          </div>
          <div class="org-line-v"></div>

          <!-- 수평 연결선 -->
          <div class="w-2/3 h-0.5 bg-outline-variant relative">
            <div class="absolute left-0 top-0 w-0.5 h-8 bg-outline-variant mx-auto"></div>
            <div class="absolute left-1/2 top-0 w-0.5 h-8 bg-outline-variant mx-auto"></div>
            <div class="absolute right-0 top-0 w-0.5 h-8 bg-outline-variant mx-auto"></div>
          </div>

          <!-- Level 3: 부서 -->
          <div class="grid grid-cols-3 gap-8 mt-8 w-full">
            <div class="flex flex-col items-center">
              <div class="w-full max-w-xs p-6 glass-card rounded-2xl border-t-4 border-t-leaf-green node-hover">
                <div class="flex items-center gap-3 mb-4">
                  <span class="material-symbols-outlined text-leaf-green">settings_accessibility</span>
                  <h4 class="font-headline-md text-headline-md text-on-surface">지원 부서</h4>
                </div>
                <ul class="space-y-2 text-body-md text-on-surface-variant">
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-leaf-green rounded-full"></span>인사·총무</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-leaf-green rounded-full"></span>회계·재무</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-leaf-green rounded-full"></span>홍보·기획</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-full max-w-xs p-6 glass-card rounded-2xl border-t-4 border-t-deep-ocean node-hover">
                <div class="flex items-center gap-3 mb-4">
                  <span class="material-symbols-outlined text-deep-ocean">volunteer_activism</span>
                  <h4 class="font-headline-md text-headline-md text-on-surface">비영리 사업부</h4>
                </div>
                <ul class="space-y-2 text-body-md text-on-surface-variant">
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-deep-ocean rounded-full"></span>오케스트라</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-deep-ocean rounded-full"></span>이웃사랑 나눔 사업</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-deep-ocean rounded-full"></span>장학 사업</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-full max-w-xs p-6 glass-card rounded-2xl border-t-4 border-t-warm-accent node-hover">
                <div class="flex items-center gap-3 mb-4">
                  <span class="material-symbols-outlined text-warm-accent">trending_up</span>
                  <h4 class="font-headline-md text-headline-md text-on-surface">수익 사업부</h4>
                </div>
                <ul class="space-y-2 text-body-md text-on-surface-variant">
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-warm-accent rounded-full"></span>카페 마노아</li>
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-warm-accent rounded-full"></span>평생교육원</li>
                </ul>
              </div>
            </div>
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

const committees = [
  { icon: 'corporate_fare', title: '운영위원회', desc: '법인의 주요 운영 정책 및 예산안 심의 결정' },
  { icon: 'how_to_reg', title: '전문심사위원회', desc: '지원 대상자 선발 및 지원 프로그램의 적정성 평가' },
  { icon: 'policy', title: '윤리위원회', desc: '기부금 투명 관리 및 조직 내 윤리 경영 감시' },
  { icon: 'handshake', title: '대외협력위원회', desc: '유관 기관 파트너십 구축 및 지역 연계 사업 자문' },
]
</script>
