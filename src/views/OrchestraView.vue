<template>
  <main>
    <!-- Hero -->
    <section class="relative h-[400px] md:h-[500px] overflow-hidden">
      <img
        src="/static/orch_main.jpg"
        alt="뉴왕십리 오케스트라"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-deep-ocean/30 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </section>

    <BreadCrumb current="오케스트라" parent="사업" />

    <!-- Main Content -->
    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter">

        <div class="mb-16">
          <h2 class="font-headline-lg text-headline-lg text-on-surface inline-block relative pb-4">
            오케스트라 사업
            <span class="absolute bottom-0 left-0 w-12 h-1 bg-leaf-green"></span>
          </h2>
          <p class="text-on-surface-variant font-body-lg text-body-lg mt-6">
            사단법인 꽃재의 "뉴왕십리 오케스트라"가 진행하는 사업 활동입니다.
          </p>
        </div>

        <div class="space-y-12">
          <!-- 다문화 오케스트라 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[320px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[280px] relative overflow-hidden group">
              <img
                src="/static/orch.png"
                alt="다문화 오케스트라"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-8">다문화 오케스트라</h3>
              <div class="space-y-3 font-body-md text-body-md">
                <div class="flex">
                  <div class="w-24 shrink-0 font-semibold text-on-surface">대상</div>
                  <div class="text-on-surface-variant">다문화, 외국인 노동자 가정, 대상자 면접 후 선발</div>
                </div>
                <div class="flex">
                  <div class="w-24 shrink-0 font-semibold text-on-surface">내용</div>
                  <div class="text-on-surface-variant">수강료, 악기, 교재 지원, 오케스트라 회비 전액 지원</div>
                </div>
              </div>
            </div>
          </article>

          <!-- 지역 문화 공연 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[320px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[280px] relative overflow-hidden group">
              <img
                src="/static/orch3.png"
                alt="지역 문화 공연"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-8">지역 문화 공연</h3>
              <div class="space-y-3 font-body-md text-body-md">
                <div class="flex">
                  <div class="w-24 shrink-0 font-semibold text-on-surface">시기</div>
                  <div class="text-on-surface-variant">상시</div>
                </div>
                <div class="flex">
                  <div class="w-24 shrink-0 font-semibold text-on-surface">내용</div>
                  <div class="text-on-surface-variant">지역 문화 공연 "성동구 정오의 음악회", "성동 가족 페스티벌" 에서 연주 섬김</div>
                </div>
              </div>
            </div>
          </article>

          <!-- 취약계층 문화 지원 -->
          <article class="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden min-h-[320px] border border-outline-variant/20 soft-shadow hover-lift">
            <div class="md:w-[40%] min-h-[280px] relative overflow-hidden group">
              <img
                src="/static/hospital1.png"
                alt="취약계층 문화 지원"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
              <h3 class="font-headline-md text-headline-md text-on-surface mb-8">취약계층 문화 지원</h3>
              <div class="space-y-3 font-body-md text-body-md">
                <div class="flex">
                  <div class="w-24 shrink-0 font-semibold text-on-surface">시기</div>
                  <div class="text-on-surface-variant">상시</div>
                </div>
                <div class="flex">
                  <div class="w-24 shrink-0 font-semibold text-on-surface">내용</div>
                  <div class="text-on-surface-variant">찾아가는 음악회 "분당 차병원 연주", "쪽방촌 지원사업 연주" 봉사 활동</div>
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
