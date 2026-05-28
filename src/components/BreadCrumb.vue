<template>
  <section class="bg-white border-b border-outline-variant/20">
    <div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-4">
      <nav class="flex items-center gap-2 text-on-surface-variant">
        <span class="material-symbols-outlined text-[18px]">home</span>
        <router-link to="/" class="font-label-sm text-label-sm hover:text-primary transition-colors">Home</router-link>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        <span class="font-label-sm text-label-sm">{{ parent }}</span>
        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        <span class="font-label-sm text-label-sm text-primary font-bold">{{ current }}</span>
      </nav>
    </div>
  </section>
</template>

<script setup>
defineProps({
  current: { type: String, required: true },
  parent: { type: String, default: '소개' },
})
</script>
