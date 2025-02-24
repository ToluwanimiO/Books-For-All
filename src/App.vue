<template>
  <div id="app">
    <AppLayout>
      <router-view v-slot="{ Component }" :key="$route.path">
        <component :is="Component" />
      </router-view>
    </AppLayout>
  </div>
</template>

<script lang="ts" setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { RouterView } from "vue-router";
</script>
