<template>
  <header
    class="bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm sticky top-0 z-50 h-24"
    @mouseleave="closeMenu"
  >
    <div class="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
      <!-- 로고 + 데스크탑 GNB -->
      <div class="flex items-center">
        <router-link to="/" class="flex items-center">
          <img
            src="/static/logo.png"
            alt="꽃재 Logo"
            class="w-auto object-contain h-28"
          />
        </router-link>

        <nav class="hidden md:flex items-center gap-24 ml-24">
          <!-- 소개 -->
          <div class="relative" @mouseenter="openMenu('intro')">
            <button
              class="text-body-lg font-bold transition-colors duration-200 pb-1"
              :class="isIntroActive
                ? 'text-primary border-b-2 border-leaf-green'
                : 'text-on-surface-variant hover:text-primary'"
            >
              소개
            </button>
          </div>

          <!-- 사업 -->
          <div class="relative" @mouseenter="openMenu('business')">
            <button
              class="text-body-lg font-bold transition-colors duration-200 pb-1"
              :class="isBusinessActive
                ? 'text-primary border-b-2 border-leaf-green'
                : 'text-on-surface-variant hover:text-primary'"
            >
              사업
            </button>
          </div>

          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors duration-200 text-body-lg font-bold">꽃재 이야기</a>
          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors duration-200 text-body-lg font-bold">소식</a>
        </nav>
      </div>

      <!-- 우측 버튼 -->
      <div class="flex items-center gap-4">
        <button class="hidden md:block px-6 py-2 rounded-lg font-label-sm text-label-sm text-primary border-2 border-primary hover:bg-primary/5 transition-all active:scale-95">
          후원하기
        </button>
        <button class="px-6 py-2.5 rounded-lg font-label-sm text-label-sm bg-primary text-on-primary hover:bg-primary/90 transition-all active:scale-95 shadow-md">
          기부금 영수증 문의
        </button>
        <button class="flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/5 transition-all active:scale-95">
          <span class="material-symbols-outlined" style="font-size: 28px;">menu</span>
        </button>
      </div>
    </div>

    <!-- 드롭다운 패널 -->
    <Transition name="dropdown">
      <div
        v-if="activeMenu"
        class="absolute left-0 right-0 top-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-lg"
        @mouseenter="keepMenu"
        @mouseleave="closeMenu"
      >
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-6">
          <div class="flex items-start">
            <!-- 로고와 동일 너비 스페이서 -->
            <img src="/static/logo.png" alt="" aria-hidden="true" class="h-28 w-auto invisible shrink-0" />
            <!-- nav 구조를 그대로 미러링하여 각 메뉴 아래에 정렬 -->
            <div class="flex items-start gap-24 ml-16">
              <!-- 소개 슬롯 -->
              <div>
                <ul v-if="activeMenu === 'intro'" class="flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in introMenuItems" :key="item.path">
                    <router-link
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMenu"
                    >
                      {{ item.label }}
                    </router-link>
                  </li>
                </ul>
                <!-- 사업 메뉴가 열렸을 때 소개 자리를 점유하는 invisible 스페이서 -->
                <span v-else class="invisible pointer-events-none text-body-lg font-bold">소개</span>
              </div>

              <!-- 사업 슬롯 -->
              <ul v-if="activeMenu === 'business'" class="flex flex-col gap-0.5 min-w-[160px]">
                <li v-for="item in businessMenuItems" :key="item.path">
                  <router-link
                    v-if="item.path !== '#'"
                    :to="item.path"
                    class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                    :class="$route.path === item.path
                      ? 'bg-primary/10 text-on-surface font-bold'
                      : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                    @click="closeMenu"
                  >
                    {{ item.label }}
                  </router-link>
                  <a
                    v-else
                    href="#"
                    class="flex items-center px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-all duration-150"
                  >
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = ref(null)
let closeTimer = null

const introMenuItems = [
  { label: '이사장 인사말', path: '/intro' },
  { label: '미션 및 비전', path: '/missions' },
  { label: '조직도', path: '/organization' },
  { label: '산하시설', path: '/facility' },
  { label: '연혁', path: '/history' },
  { label: '오시는 길', path: '/location' },
]

const businessMenuItems = [
  { label: '오케스트라', path: '/orchestra' },
  { label: '이웃사랑 나눔사업', path: '/nanum' },
  { label: '장학 사업', path: '/scholarship' },
]

const introRoutes = introMenuItems.map(i => i.path)
const businessRoutes = ['/orchestra', '/nanum', '/scholarship']

const isIntroActive = computed(() => introRoutes.includes(route.path))
const isBusinessActive = computed(() => businessRoutes.includes(route.path))

function openMenu(name) {
  clearTimeout(closeTimer)
  activeMenu.value = name
}

function keepMenu() {
  clearTimeout(closeTimer)
}

function closeMenu() {
  closeTimer = setTimeout(() => {
    activeMenu.value = null
  }, 80)
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
