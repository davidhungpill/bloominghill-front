<template>
  <footer class="bg-surface-muted border-t border-outline-variant/20 py-section-padding">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-mobile md:px-gutter max-w-container-max mx-auto gap-base">
      <div class="flex flex-col gap-4">
        <div class="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9FeOlo-pmMFsbsKOIJRonDywtdECRoeXZzEp9-OvLh9tWyfTwLIS2vKbdNc_K-gda_LhCsHC88XvgiW_btTAXQbPQx03U27qv6oPdUrsOZz9zf4ZAWK2OuzkytPHLxs6WPGKzEQzdTfTOUtoBXiCqP4O5YaPX85__GJzx-U7edlPthu8300Hy0DtrxR9B7NpQUT-X_f2pfhITUSuAPhK_7XhDBRAep0rkQP2egU4xKgEdxlbPw8FmvfremTulwf8d7cnyAULAKciC"
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
          서울특별시 성동구 왕십리로 123 꽃재빌딩 4층 | 대표자: 김꽃재 | 사업자번호: 123-45-67890<br/>
          대표전화: 02-1234-5678 | 이메일: info@bloominghill.or.kr
        </p>
        <p class="font-label-sm text-label-sm text-on-surface-variant/70">© 2024 사회복지법인 꽃재 Blooming Hill. All Rights Reserved.</p>
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
          <p class="font-label-sm text-primary mb-1">후원문의 (평일 09:00 - 18:00)</p>
          <p class="text-2xl font-headline-md text-on-surface">02-1234-5678</p>
        </div>
      </div>
    </div>
  </footer>
</template>
