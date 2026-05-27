<template>
  <main>
    <SubPageHero />
    <BreadCrumb current="산하시설" />

    <section class="py-section-padding bg-white">
      <div class="max-w-container-max mx-auto px-gutter">
        <div class="mb-16 text-left">
          <span class="inline-block px-4 py-1 rounded-full bg-leaf-green/10 text-leaf-green font-bold text-sm mb-6">Affiliated Facilities</span>
          <h2 class="font-headline-lg text-headline-lg md:text-headline-xl leading-tight text-on-surface mb-8">
            <span class="text-on-surface">"세상을 꽃피우는 따뜻한 울림,</span><br>
            <span class="text-leaf-green">꽃재의 산하시설입니다."</span>
          </h2>
          <div class="w-24 h-1.5 bg-leaf-green mt-8"></div>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mt-8">
            지역사회와 함께 숨쉬며 나눔의 가치를 실천하는 꽃재의 산하시설입니다. <br class="hidden md:block">
            더 가까운 곳에서, 더 따뜻한 온기를 전하는 꽃재의 공간들을 소개합니다.
          </p>
        </div>

        <div class="space-y-32">
          <!-- 까페 마노아 -->
          <article class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start group">
            <div class="overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
              <img
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG0bIPV-WMGD54EiR1Poq2C4D9nKsCIrwVkbRRj6Cb79Q8iZ6U6zXCI7h6t9PcgKqGYhPWHugi0cKfZtvOYFK-hKDJO7hWfArUMWKTk7naWkLmGCBgM2qShqakitS36dc1gYaUORMv-dbeDvx7gYbVwMB4ThN9mwZJjh-KH9rJ9a1OC8A4wib1s9opzmoKfjnylUMuu7KYjxY5TbPXiVvZQw3nO6Olw3mfLzHeeK_GslIVbCa5wQ3UfHN4Pd9DlDTRQHVEtlBC7jMj"
                alt="까페 마노아"
              />
            </div>
            <div class="text-left space-y-8 py-4">
              <div>
                <span class="text-leaf-green font-bold text-lg mb-2 block">01</span>
                <h2 class="font-headline-lg text-headline-lg font-bold text-on-surface mb-6">까페 마노아</h2>
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
                      <td class="px-4 py-4 text-on-surface-variant">평일 09:00 - 18:00 / 토요일 10:00 - 15:00</td>
                    </tr>
                    <tr class="border-b border-outline-variant/30">
                      <th class="px-4 py-4 font-bold text-on-surface">주요 메뉴</th>
                      <td class="px-4 py-4 text-on-surface-variant">공정무역 아메리카노, 유기농 티, 수제 쿠키</td>
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzxSxnq7QxXl3Y-pnpPD1AQf8iIcgCXrLWpbSGgapp3X25yaFJdInMc3-0p-RTrFmYXgDDEF8SW9_FfZJCZ9-u-f6AwkSZLf8maQx4E5Ob2vHkerc8EWiARfGpMErwfj1j_ajsrZYgdDLpMOyVk98_adjjXyIo-6sDzTuU4OouZGjQiZzBoBH_5BaQOoKKZaOvwOnMz6S6PAQ3CiJ_rz6KqcVG95jHbYEwM4iAWdn-CPPqxe6jew9iRlHg93pT2oHHRMcEXher5as0"
                alt="평생교육원"
              />
            </div>
            <div class="lg:order-1 text-left space-y-8 py-4">
              <div>
                <span class="text-leaf-green font-bold text-lg mb-2 block">02</span>
                <h2 class="font-headline-lg text-headline-lg font-bold text-on-surface mb-6">평생교육원</h2>
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
              <button class="flex items-center gap-2 text-leaf-green font-bold hover:translate-x-2 transition-transform">
                프로그램 보러가기<span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import SubPageHero from '../components/SubPageHero.vue'
import BreadCrumb from '../components/BreadCrumb.vue'
</script>
