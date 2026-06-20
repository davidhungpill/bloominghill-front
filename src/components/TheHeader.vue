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

          <!-- 우리 이야기 -->
          <div class="relative" @mouseenter="openMenu('story')">
            <button
              class="text-body-lg font-bold transition-colors duration-200 pb-1"
              :class="isStoryActive
                ? 'text-primary border-b-2 border-leaf-green'
                : 'text-on-surface-variant hover:text-primary'"
            >
              우리 이야기
            </button>
          </div>

          <!-- 소식 -->
          <div class="relative" @mouseenter="openMenu('news')">
            <button
              class="text-body-lg font-bold transition-colors duration-200 pb-1"
              :class="isNewsActive
                ? 'text-primary border-b-2 border-leaf-green'
                : 'text-on-surface-variant hover:text-primary'"
            >
              소식
            </button>
          </div>
        </nav>
      </div>

      <!-- 우측 버튼 -->
      <div class="flex items-center gap-4">
        <router-link to="/donate" class="hidden md:block px-6 py-2 rounded-lg font-label-sm text-label-sm text-primary border-2 border-primary hover:bg-primary/5 transition-all active:scale-95">
          후원하기
        </router-link>
        <router-link to="/donate-cert" class="hidden md:block px-6 py-2.5 rounded-lg font-label-sm text-label-sm bg-primary text-on-primary hover:bg-primary/90 transition-all active:scale-95 shadow-md">
          기부금 영수증 문의
        </router-link>
        <button
          class="flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/5 transition-all active:scale-95"
          @click="toggleMobileMenu"
        >
          <span class="material-symbols-outlined transition-all duration-200" style="font-size: 28px;">
            {{ mobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- 호버 드롭다운 패널 -->
    <Transition name="dropdown">
      <div
        v-if="activeMenu"
        class="absolute left-0 right-0 top-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-lg"
        @mouseenter="keepMenu"
        @mouseleave="closeMenu"
      >
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-6">
          <div class="flex items-start">
            <img src="/static/logo.png" alt="" aria-hidden="true" class="h-28 w-auto invisible shrink-0" />
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
                    >{{ item.label }}</router-link>
                  </li>
                </ul>
                <span v-else class="invisible pointer-events-none text-body-lg font-bold">소개</span>
              </div>

              <!-- 사업 슬롯 -->
              <div v-if="activeMenu === 'business' || activeMenu === 'story' || activeMenu === 'news'">
                <ul v-if="activeMenu === 'business'" class="flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in businessMenuItems" :key="item.path">
                    <router-link
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMenu"
                    >{{ item.label }}</router-link>
                  </li>
                </ul>
                <span v-else class="invisible pointer-events-none text-body-lg font-bold">사업</span>
              </div>

              <!-- 꽃재 이야기 슬롯 -->
              <div v-if="activeMenu === 'story' || activeMenu === 'news'" :class="activeMenu === 'story' ? 'ml-4' : ''">
                <ul v-if="activeMenu === 'story'" class="flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in storyMenuItems" :key="item.path">
                    <router-link
                      v-if="item.path !== '#'"
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMenu"
                    >{{ item.label }}</router-link>
                    <a
                      v-else
                      href="#"
                      class="flex items-center px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-all duration-150"
                    >{{ item.label }}</a>
                  </li>
                </ul>
                <span v-else class="invisible pointer-events-none text-body-lg font-bold">꽃재 이야기</span>
              </div>

              <!-- 소식 슬롯 -->
              <ul v-if="activeMenu === 'news'" class="flex flex-col gap-0.5 min-w-[160px]">
                <li v-for="item in newsMenuItems" :key="item.path">
                  <router-link
                    v-if="item.path !== '#'"
                    :to="item.path"
                    class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                    :class="$route.path === item.path
                      ? 'bg-primary/10 text-on-surface font-bold'
                      : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                    @click="closeMenu"
                  >{{ item.label }}</router-link>
                  <a
                    v-else
                    href="#"
                    class="flex items-center px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-all duration-150"
                  >{{ item.label }}</a>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 햄버거 전체 메뉴 패널 -->
    <Transition name="fullmenu">
      <div
        v-if="mobileMenuOpen"
        class="absolute left-0 right-0 top-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-lg"
      >
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-6">
          <!-- 호버 드롭다운과 동일한 구조: 로고 스페이서 + gap-24 ml-16 -->
          <div class="flex items-start" style="min-height:240px">
            <img src="/static/logo.png" alt="" aria-hidden="true" class="h-28 w-auto invisible shrink-0" />
            <div class="flex items-start gap-24 ml-16">

              <!-- 소개: invisible span이 nav 버튼 너비 확보, ul은 같은 위치에 absolute 오버레이 -->
              <div class="relative">
                <span class="invisible pointer-events-none text-body-lg font-bold">소개</span>
                <ul class="absolute top-0 left-0 flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in introMenuItems" :key="item.path">
                    <router-link
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMobileMenu"
                    >{{ item.label }}</router-link>
                  </li>
                </ul>
              </div>

              <!-- 사업 -->
              <div class="relative">
                <span class="invisible pointer-events-none text-body-lg font-bold">사업</span>
                <ul class="absolute top-0 left-0 flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in businessMenuItems" :key="item.path">
                    <router-link
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMobileMenu"
                    >{{ item.label }}</router-link>
                  </li>
                </ul>
              </div>

              <!-- 꽃재 이야기 -->
              <div class="relative">
                <span class="invisible pointer-events-none text-body-lg font-bold">꽃재 이야기</span>
                <ul class="absolute top-0 left-4 flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in storyMenuItems" :key="item.path">
                    <router-link
                      v-if="item.path !== '#'"
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMobileMenu"
                    >{{ item.label }}</router-link>
                    <a
                      v-else
                      href="#"
                      class="flex items-center px-4 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-all duration-150"
                    >{{ item.label }}</a>
                  </li>
                </ul>
              </div>

              <!-- 소식 -->
              <div class="relative">
                <span class="invisible pointer-events-none text-body-lg font-bold">소식</span>
                <ul class="absolute top-0 left-0 flex flex-col gap-0.5 min-w-[160px]">
                  <li v-for="item in newsMenuItems" :key="item.path">
                    <router-link
                      :to="item.path"
                      class="flex items-center px-4 py-2 rounded-lg text-sm transition-all duration-150"
                      :class="$route.path === item.path
                        ? 'bg-primary/10 text-on-surface font-bold'
                        : 'text-on-surface hover:bg-surface-container hover:text-primary'"
                      @click="closeMobileMenu"
                    >{{ item.label }}</router-link>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>

  <!-- 배경 오버레이 (메뉴 열렸을 때 외부 클릭으로 닫기) -->
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/20 z-40"
        @click="closeMobileMenu"
      ></div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = ref(null)
const mobileMenuOpen = ref(false)
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

const storyMenuItems = [
  { label: '나눔 이야기', path: '/story' },
  { label: '언론 보도자료', path: '/press' },
  { label: '꽃재 평생 교육원', path: '/education' },
  { label: '카페 마노아', path: '/cafe' },
]

const newsMenuItems = [
  { label: '공지사항', path: '/notice' },
  { label: '자주 묻는 질문', path: '/faq' },
]

const introRoutes = introMenuItems.map(i => i.path)
const businessRoutes = ['/orchestra', '/nanum', '/scholarship']
const newsRoutes = ['/notice', '/faq']
const isIntroActive = computed(() => introRoutes.includes(route.path))
const isBusinessActive = computed(() => businessRoutes.includes(route.path))
const isStoryActive = computed(() =>
  route.path === '/story' || route.path.startsWith('/story/') ||
  route.path === '/press' || route.path === '/education' ||
  route.path === '/cafe' || route.path.startsWith('/cafe/')
)
const isNewsActive = computed(() => newsRoutes.includes(route.path))

watch(() => route.path, () => {
  mobileMenuOpen.value = false
  activeMenu.value = null
})

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    clearTimeout(closeTimer)
    activeMenu.value = null
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function openMenu(name) {
  clearTimeout(closeTimer)
  activeMenu.value = name
  mobileMenuOpen.value = false
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

.fullmenu-enter-active,
.fullmenu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fullmenu-enter-from,
.fullmenu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
