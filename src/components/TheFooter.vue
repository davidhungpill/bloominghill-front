<template>
  <footer class="bg-surface-muted border-t border-outline-variant/20 py-section-padding">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-base">
      <div class="flex flex-col gap-4">
        <div class="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <img
            src="/static/logo.png"
            alt="꽃재 Logo"
            class="h-8 w-auto grayscale contrast-125 opacity-70"
          />
          <span>사단법인 꽃재</span>
        </div>
        <div class="flex flex-wrap gap-4 font-label-sm text-label-sm">
          <a href="#" class="text-on-surface-variant hover:text-leaf-green transition-colors">이용약관</a>
          <a href="#" class="text-primary font-semibold underline hover:text-leaf-green transition-colors">개인정보처리방침</a>
          <a href="#" class="text-on-surface-variant hover:text-leaf-green transition-colors">이메일무단수집거부</a>
          <router-link to="/location" class="text-on-surface-variant hover:text-leaf-green transition-colors">찾아오시는 길</router-link>
        </div>
        <p class="font-label-sm text-label-sm text-on-surface-variant/70 mt-4">
          서울특별시 성동구 마장로 164 꽃재교회 지하1층 | 대표자: 김성복 | 사업자번호: 226-82-15891<br/>
          대표전화: 02-2299-5424 | 이메일: bloom5424@naver.com
        </p>
        <p class="font-label-sm text-label-sm text-on-surface-variant/70">© 2021 사회복지법인 꽃재 Blooming Hill. All Rights Reserved.</p>
      </div>

      <div class="flex flex-col md:items-end gap-6 w-full md:w-auto">
        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
            <span class="material-symbols-outlined">share</span>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
            <span class="material-symbols-outlined">alternate_email</span>
          </a>
        </div>
        <div class="bg-surface-container p-4 rounded-xl border border-outline-variant/30 text-right">
          <p class="font-label-sm text-primary mb-1">운영시간 및 후원문의 (화-금 09:00 - 18:00)</p>
          <p class="text-2xl font-headline-md text-on-surface">{{ phone }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchSiteConfig, getSiteText } from '../api/siteConfig'

const phone = ref('02-2299-5424')

onMounted(async () => {
  const config = await fetchSiteConfig()
  phone.value = getSiteText(config, 'phone')
})
</script>
