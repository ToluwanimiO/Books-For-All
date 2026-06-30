<template>
  <main-navbar v-if="pageLayout == 'AppLayoutDefault'" />
  <main class="p-5 md:p-10">
    <slot />
  </main>
  <footer v-if="pageLayout == 'AppLayoutDefault'" class="container-fluid text-center p-3">
    <p>© 2024 Books for All. All rights reserved.</p>
  </footer>
</template>

<script lang="ts" setup>
import MainNavbar from '@/components/Navigation/MainNavbar.vue'
defineProps({
  pageLayout: {
    type: String,
    default: 'AppLayoutDefault',
  },
})
</script>
