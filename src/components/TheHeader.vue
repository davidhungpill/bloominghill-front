<template>
  <header
    class="bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm sticky top-0 z-50 h-24"
    @mouseleave="closeDropdown"
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
          <!-- 소개: hover 드롭다운 -->
          <div class="relative" @mouseenter="openDropdown">
            <button
              class="text-body-lg font-bold transition-colors duration-200 pb-1"
              :class="isIntroActive
                ? 'text-primary border-b-2 border-leaf-green'
                : 'text-on-surface-variant hover:text-primary'"
            >
              소개
            </button>
          </div>

          <a href="#" class="text-on-surface-variant hover:text-primary transition-colors duration-200 text-body-lg font-bold">사업</a>
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

    <!-- 소개 드롭다운 패널 -->
    <Transition name="dropdown">
      <div
        v-if="dropdownOpen"
        class="absolute left-0 right-0 top-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-lg"
        @mouseenter="openDropdown"
        @mouseleave="closeDropdown"
      >
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-6">
          <div class="flex items-start">
            <!-- 로고와 동일한 너비의 invisible 스페이서로 "소개" 위치에 정렬 -->
            <img src="/static/logo.png" alt="" aria-hidden="true" class="h-28 w-auto invisible shrink-0" />
            <ul class="flex flex-col gap-1 max-w-xs ml-24">
              <li v-for="item in subMenuItems" :key="item.path">
                <router-link
                  :to="item.path"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-body-md transition-all duration-150 group"
                  :class="$route.path === item.path
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'"
                  @click="closeDropdown"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                    :class="$route.path === item.path ? 'bg-leaf-green' : 'bg-outline-variant group-hover:bg-leaf-green'"
                  ></span>
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
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
const dropdownOpen = ref(false)

const subMenuItems = [
  { label: '이사장 인사말', path: '/intro' },
  { label: '미션 및 비전', path: '/missions' },
  { label: '조직도', path: '/organization' },
  { label: '산하시설', path: '/facility' },
  { label: '연혁', path: '/history' },
  { label: '오시는 길', path: '/location' },
]

const introRoutes = subMenuItems.map(i => i.path)
const isIntroActive = computed(() => introRoutes.includes(route.path))

function openDropdown() {
  dropdownOpen.value = true
}

function closeDropdown() {
  dropdownOpen.value = false
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
