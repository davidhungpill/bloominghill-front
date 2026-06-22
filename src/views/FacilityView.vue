<template>
  <main>
    <SubPageHero :src="heroSrc" />
    <BreadCrumb current="산하시설" />

    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-gutter">
        <div class="mb-16 text-left">
          <span class="inline-block px-4 py-1 rounded-full bg-leaf-green/10 text-leaf-green font-bold text-sm mb-6">Affiliated Facilities</span>
          <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">
            <span class="text-on-surface">세상을 꽃피우는 따뜻한 울림,</span><br>
            <span class="text-leaf-green">사단법인 꽃재의 산하시설입니다</span>
          </h2>
          <div class="w-24 h-1.5 bg-leaf-green mt-8"></div>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mt-8">
            지역사회와 함께 숨쉬며 나눔의 가치를 실천하는 사단법인 꽃재의 산하시설입니다. <br class="hidden md:block">
            더 가까운 곳에서, 더 따뜻한 온기를 전하는 사단법인 꽃재의 공간들을 소개합니다.
          </p>
        </div>

        <div class="space-y-32">
          <!-- 카페 마노아 -->
          <article class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start group">
            <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
              <img
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                :src="cafeSrc"
                alt="카페 마노아"
              />
            </div>
            <div class="text-left space-y-8 py-4">
              <div>
                <span class="text-leaf-green font-bold text-lg mb-2 block">01</span>
                <h2 class="font-headline-lg text-headline-lg font-bold text-on-surface mb-6">카페 마노아</h2>
                <p class="font-body-lg text-on-surface-variant leading-relaxed">
                  지역 주민들의 쉼터이자 소통의 공간으로, 직접 만든 음료와 건강한 먹거리를 제공하며 수익금은 지원 사업을 위해 사용됩니다.
                </p>
              </div>
              <div class="overflow-hidden border-outline-variant">
                <table class="w-full text-left border-collapse">
                  <tbody class="font-body-md">
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 w-32 font-bold text-on-surface">위치</th>
                      <td class="px-4 py-4 text-on-surface-variant">꽃재 교회 1층</td>
                    </tr>
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 font-bold text-on-surface">운영시간</th>
                      <td class="px-4 py-4">
                        <div class="text-on-surface-variant">화-토요일 10:00 - 18:00 / 일요일 10:00 - 17:00</div>
                        <div class="text-red-500 mt-1">매주 월요일, 법정 공휴일 휴무</div>
                      </td>
                    </tr>
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 font-bold text-on-surface">주요 메뉴</th>
                      <td class="px-4 py-4 text-on-surface-variant">커피, 수제청 음료, 대추차, 디저트 등</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>

          <!-- 평생교육원 -->
          <article class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start group">
            <div class="lg:order-2 overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
              <img
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                :src="lifelongSrc"
                alt="평생교육원"
              />
            </div>
            <div class="lg:order-1 text-left space-y-8 py-4">
              <div>
                <span class="text-leaf-green font-bold text-lg mb-2 block">02</span>
                <h2 class="font-headline-lg text-headline-lg font-bold text-on-surface mb-6">꽃재 평생교육원</h2>
                <p class="font-body-lg text-on-surface-variant leading-relaxed">
                  배움에는 끝이 없다는 신념 아래, 어린이 및 성인들을 위한 다양한 교육 프로그램을 제공하여 주민들의 자아실현과 성장을 돕습니다.
                </p>
              </div>
              <div class="overflow-hidden border-outline-variant">
                <table class="w-full text-left border-collapse">
                  <tbody class="font-body-md">
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 w-32 font-bold text-on-surface">위치</th>
                      <td class="px-4 py-4 text-on-surface-variant">꽃재 교회 지하1층 평생교육원</td>
                    </tr>
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 font-bold text-on-surface">교육대상</th>
                      <td class="px-4 py-4 text-on-surface-variant">지역 주민 누구나</td>
                    </tr>
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 font-bold text-on-surface">운영시간</th>
                      <td class="px-4 py-4 text-on-surface-variant">학기별 상이 (홈페이지 공지사항 참조)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <router-link to="/education" class="flex items-center gap-2 text-leaf-green font-bold hover:translate-x-2 transition-transform">
                프로그램 보러가기<span class="material-symbols-outlined">arrow_forward</span>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
import { useHero } from '../composables/useHero'
import { fetchSiteConfig, getHeroUrl } from '../api/siteConfig'

const { heroSrc } = useHero('heroIntro')

const cafeSrc = ref(null)
const lifelongSrc = ref(null)

onMounted(async () => {
  const config = await fetchSiteConfig()
  cafeSrc.value = getHeroUrl(config, 'facilityCafe')
  lifelongSrc.value = getHeroUrl(config, 'facilityLifelong')
})
</script>
