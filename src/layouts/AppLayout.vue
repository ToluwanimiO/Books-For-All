<template>
  <div>
    <AppLayoutSideNav v-if="routeLayout === 'AppLayoutSideNav'">
      <slot />
    </AppLayoutSideNav>
    <AppLayoutDefault v-else>
      <slot />
    </AppLayoutDefault>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppLayoutSideNav from "./AppLayoutSideNav.vue";
import AppLayoutDefault from "./AppLayoutDefault.vue";

const route = useRoute();
const router = useRouter();

const routeLayout = computed(() => route.meta.layout);

onMounted(async () => {
  await router.isReady();
  console.log(route);
});
</script>
