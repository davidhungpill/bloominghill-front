<template>
  <TopBanner />
  <TheHeader />
  <router-view />
  <TheFooter />
  <DonationFab />
</template>

<script setup>
import TopBanner from './components/TopBanner.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import DonationFab from './components/DonationFab.vue'
</script>
