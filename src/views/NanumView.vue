<template>
  <main>
    <!-- Hero -->
    <section class="relative h-[240px] md:h-[320px] overflow-hidden">
      <img
        src="/static/edu.jpg"
        alt="이웃사랑 나눔 사업"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
      
    </section>

    <BreadCrumb current="이웃사랑 나눔사업" parent="사업" />

    <!-- Main Content -->
    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <div class="mb-12">
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">이웃사랑 나눔 사업</h2>
          <div class="w-16 h-1 bg-leaf-green"></div>
          <p class="mt-4 font-body-md text-body-md text-on-surface-variant">
            사단 법인 꽃재에서 지역 주민들을 섬기기 위한 이웃 사랑 나눔 사업 활동입니다.
          </p>
        </div>

        <div class="space-y-8">

          <!-- 다문화 사업 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcwbyzqxRrgkzKsHJnNKWVjCqQ0cA7pCcOziuywqzY1ieKVwKgvPrUNKyRs5XbKFa-TU0vR3-_04R4go3-_4j7wbPSeembABxs1bV3WfF_xYI1zTw5t754CnerZYBTUK-QLQCVs0tl7aaqUz-HJ96AGwJIeplFtKhzq0CLDcKhqzYOmHGLbs_rIPDssWrHuYpOMP41UrTHy32rlE9nx7fL1-x7Pdye3kbiSYXcOUQ4-FLe6pyF9PiAuxWDEaX8CoHUsAORcHkfBNUN"
                alt="다문화 사업"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">다문화 사업</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">다문화 가정 재정지원</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">성동구 가족센터</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 재가 복지 사업 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvuHCeC9-PJxUsp0rHIkdwBvR9HlYWobDTaaBLB4j86cVu0LmX0uP8MMOEXKzLZWKKvti69miTlFxe9JErYOg29sQXHh6sw5EJY4TVbhxhVnGgHdb2YF00Q07Ph_0Ym_oy2ZZCrZ9NntawnSY_EHpYY6DCCuy2yHY9bqg2hXVpS95UFBh7Vo0Wb00EuC0Uy6AemtMTst0aw0nLUIBSGknXRVQNkSrvKJ7y1LFjDWD4Rb3UByWJVet-tAqo0Tf0VOIo9mBEn7C9omzk"
                alt="재가 복지 사업"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">재가 복지 사업</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">독거노인, 차상위 계층</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">꽃재 교회</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">돌봄 서비스, 재정 지원</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 명절 나눔 사업 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTODJYgnIjpRFFVo27wzwyH047YweWkkm70fdizw-nv4BXcv6rSbsmm7h1AXjcPen76wFwVS2VBZlCzRdfIblVh5_ZBuN1Jme4XcMAw7GFPEvG35DmPA49CBwfB9xrvAQY2mGgPKzqY014ozhHogP0IGatlg5VEsOygzTkC2P0uZL12-CTBNDujUXiky8SWJ14wPrkgcS-Kk-mgCn5odcGCNLyvsx0M6TX9H2Y79BehnO8O6OSxoiBy0eSUED5spIO71sTq0fjYeME"
                alt="명절 나눔 사업"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">명절 나눔 사업</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">독거노인, 수급자</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">성동구청, 꽃재교회</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">설, 추석 생활 용품 지원</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 김장 나눔 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAsKltpXtdRP3Gh1sdjc3_iPkwznYYiZnSV_hzrHuJN4aYzW7I-bxAx0XC30WhUkPOQF7gFaxMnitKZOHU4fDgQPOKWUEeZ80m_5Vz9Uc-HVBkDCcmk1jMK9Zhdg8z_sO-iTT4VYRNgs1DI2T1aRFaocq5JA3LwYB8Ry3hnOuk6-za-J41gWnAzYK4lsei2Iv7OqVSuRUnkHue5Y5c12dAI_bmaq7J2MCFjWR2EdCMquMogoQpIL7jSDCtgFImBvYRGK6K1z-2Wzoo"
                alt="김장 나눔"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">김장 나눔</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">수급자, 독거노인, 외국인 노동자</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">성동구청, 꽃재교회</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">김장 김치 나눔</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 싼타가 되어 주세요 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjn6VCdVE6bgYBZVdsRsN5MLuoCY6iilHCt8RAfB-KdPuOu3imlJFuNEA9ns4PyIR4WPGrtcfSZCb-RVirJTPx4XxFHZduiRjsxxmHKu4_hSiiUlWJt4lbKTUT-6sdkVgamtBXvw3tFrxtzwxS59O3SDcy_88AS8AmboMBOuW-PLvGILTXDfNERrMRXpuXyNxLuTrxZhB3qVUATZQ4UTgPg1uzd3bLthwDgDYJoheJo9PlOSjP2pzdYrRwVPQe7RWSnlvO0ldElHHy"
                alt="싼타가 되어 주세요"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">싼타가 되어 주세요</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">결식아동</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">동명초, 지역 아동센터</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">밀키트 후원, 성탄절 선물 기증</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 기증 물품 나눔 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0dioloL6pUok5B7QIXyUhjumn5UjRfIDPVP8huL5eyWaiQARi8aI2hZ2xwFXEysUc-sCPGFYtXUHnpzrXCKAcOylels-iRM3WJypSjR2inuj5Cv1q5H6f_2mkW3Hfy9oytBBQbV-64nE4AuWh0LvTBq96-bhn2AHFxcHHLGfui-ronWMITTb5D8kh60QsDTA5ew6RVUFzul_Duf3rWPHpq8KVZaMtPZb6RrOLmmVHwPP5lrQmuyP19CwZt9HED-YUETXZGeCiMXR_"
                alt="기증 물품 나눔"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">기증 물품 나눔</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">쪽방촌, 외국인 노동자</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">성동구청, 성동구 가족센터</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">물품기증, 의약품 기증</span>
                </div>
              </div>
            </div>
          </article>

          <!-- 브라보 시니어 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgZjehzxWbFj5btlZQaOa3pe4uKZf9k_0iiTrTHI0OUnIHVBpUzXjBWDNdHoIasRNevSQ1a6q7xMFmW089n8I1ybFzpVMrttIhTN3m7oqkoIjG79wCAa_FZSuI2aDYhHg4QoBXVFMdlCGb2UtAJJIlloozK92bSfBv7Y1vAm99upzqFtMJmNMhIBIvjTrJnNpfksSGh2LJCsgN9HsY6_LMhlcwg83DteaLjyMfFSfLiQlTGpiz2H6GqI2fn5yA46J0qLXR7GM0bHWP"
                alt="브라보 시니어"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">브라보 시니어</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상</span>
                  <span class="text-on-surface">75세 이상 어르신</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">대상자 선정</span>
                  <span class="text-on-surface">성동구청 복지 정책과</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">공연관람, 기념품 증정, 노래 배우기 활동, 식사 제공</span>
                </div>
              </div>
            </div>
          </article>

          <!-- SOS 지원 사업 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[280px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[240px] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9GDxN6sxlihP3Hd-GgRXhpu9GrYyIeT1f_f2AkIlT-9f24oRdM5TK-5bK2mYjnnbsBOvMwWwu4N821qX0T7oM5VdCBAS89DesuNCPswlgfgHfap8WNq1ug01vOsgwoVWEQsqz_lNqWvAUeD3YrN1HWJrLiSrKZ8KdVzafWAKearRTS_4ZXXaqGIOMY5j49_rcJoJt83MtIcGIuT9h7E-9vHgyueFIi7ByuwTsagTZgA7nWVEG3Whjij98t39sDXPrOqUN2x6MadXd"
                alt="SOS 지원 사업"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-6">SOS 지원 사업</h3>
              <div class="space-y-4 font-body-md text-body-md">
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">내용</span>
                  <span class="text-on-surface">필리핀 노동자 아동 진료 지원, 한부모가정 청소년 꿈지원, 보호종료아동 이사 지원, 북한이탈주민 재정 지원</span>
                </div>
                <div class="flex">
                  <span class="w-28 shrink-0 font-semibold text-on-surface-variant">기간</span>
                  <span class="text-on-surface">상시</span>
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

<style scoped>
.hero-text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
