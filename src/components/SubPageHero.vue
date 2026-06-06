<template>
  <section class="relative flex items-center overflow-hidden h-[240px] md:h-[320px]">
    <div class="absolute inset-0 z-0 bg-surface-dim">
      <img alt="Hero background" class="w-full h-full object-cover" :src="src || '/static/spring.jpg'" />
    </div>
    <div class="relative z-10 w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto text-white text-center"></div>
  </section>
</template>

<script setup>
defineProps({ src: { type: String, default: '/static/spring.jpg' } })
</script>
