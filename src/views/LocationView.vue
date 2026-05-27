<template>
  <main>
    <SubPageHero />
    <BreadCrumb current="오시는 길" />

    <section class="py-section-padding bg-surface-container-lowest">
      <div class="max-w-container-max mx-auto px-6 lg:px-section-padding">
        <div class="mb-12">
          <span class="inline-block px-4 py-1 bg-leaf-green/10 text-leaf-green font-bold text-label-sm rounded-full mb-4 flex items-center w-fit">
            <span class="w-1.5 h-1.5 bg-leaf-green rounded-full mr-2"></span>
            Location
          </span>
          <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">
            오시는 길
          </h2>
          <div class="w-20 h-1.5 bg-leaf-green rounded-full"></div>
        </div>

        <div class="space-y-24">
          <!-- 방문 안내 -->
          <section class="flex flex-col md:flex-row gap-8 md:gap-12">
            <div class="w-full md:w-1/4">
              <h3 class="text-headline-md font-bold text-on-surface flex items-center">
                <span class="w-1.5 h-6 bg-leaf-green mr-3 rounded-full"></span>방문 안내
              </h3>
            </div>
            <div class="w-full md:w-3/4">
              <div class="divide-y divide-outline-variant">
                <div class="flex items-start py-6">
                  <div class="flex items-center w-32 shrink-0 font-bold text-on-surface">
                    <span class="material-symbols-outlined mr-2 text-leaf-green">location_on</span>주소
                  </div>
                  <div class="text-on-surface-variant font-body-lg">서울 성동구 마장로 164 지하 1층 (꽃재교회)</div>
                </div>
                <div class="flex items-start py-6">
                  <div class="flex items-center w-32 shrink-0 font-bold text-on-surface">
                    <span class="material-symbols-outlined mr-2 text-leaf-green">call</span>연락처
                  </div>
                  <div class="text-on-surface-variant font-body-lg">TEL : 02) 2299-5424, 5437 / 070-4470-9375</div>
                </div>
                <div class="flex items-start py-6 border-b border-outline-variant">
                  <div class="flex items-center w-32 shrink-0 font-bold text-on-surface">
                    <span class="material-symbols-outlined mr-2 text-leaf-green">mail</span>이메일
                  </div>
                  <div class="text-on-surface-variant font-body-lg">
                    <a class="underline decoration-leaf-green underline-offset-4" href="mailto:blooming5424@naver.com">blooming5424@naver.com</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 대중교통 안내 -->
          <section class="flex flex-col md:flex-row gap-8 md:gap-12">
            <div class="w-full md:w-1/4">
              <h3 class="text-headline-md font-bold text-on-surface flex items-center">
                <span class="w-1.5 h-6 bg-leaf-green mr-3 rounded-full"></span>대중교통 안내
              </h3>
            </div>
            <div class="w-full md:w-3/4">
              <div class="divide-y divide-outline-variant">
                <div class="py-6">
                  <p class="flex items-center font-bold text-on-surface mb-2">
                    <span class="material-symbols-outlined mr-2 text-leaf-green">train</span>지하철 이용 시
                  </p>
                  <p class="text-on-surface-variant">2호선 상왕십리역 1-1번 출구에서 나오셔서 도보로 약 <span class="text-leaf-green font-bold">8분</span> 소요됩니다.</p>
                </div>
                <div class="py-6 border-b border-outline-variant">
                  <p class="flex items-center font-bold text-on-surface mb-2">
                    <span class="material-symbols-outlined mr-2 text-leaf-green">directions_bus</span>버스 이용 시
                  </p>
                  <p class="text-on-surface-variant mb-4">"상왕십리역", "도선고등학교,꽃재교회", "숭신초등학교" 또는 "뉴타운아파트" 정류장에서 하차해서 도보 <span class="text-leaf-green font-bold">5분</span> 정도 소요됩니다.</p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p class="font-bold text-on-surface mb-1">간선버스</p>
                      <p class="text-sm text-on-surface-variant">147, 202, 241, 302, 421, 463</p>
                    </div>
                    <div>
                      <p class="font-bold text-on-surface mb-1">지선버스</p>
                      <p class="text-sm text-on-surface-variant">1017, 2012, 2013, 2014, 2015, 6211</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 지도 -->
          <section class="w-full h-[500px] rounded-3xl overflow-hidden border border-outline-variant">
            <iframe
              src="https://naver.me/FvEgIqLh"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
              title="꽃재 위치 지도"
            ></iframe>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
</script>
