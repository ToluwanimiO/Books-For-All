<template>
  <div v-if="type === 'multiple'">
    <el-tag
      v-for="(service, index) in sortedServices"
      :key="index"
      :type="service"
      >{{ formatService(service) }}</el-tag
    >
  </div>
  <el-tag v-else :type="service.toLowerCase()">{{
    formatService(service)
  }}</el-tag>
</template>

<script lang="ts" setup>
import useSorting from "@/composables/sorting";
import useSupport from "@/composables/support";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ type: string; service: string; services: any[] }>(),
  {
    type: "multiple",
    service: "info",
    services: () => [],
  },
);

const { formatText } = useSupport();
const { parseData, sortArray } = useSorting();

const sortedServices = computed(() =>
  sortArray({
    data: parseData(props.services),
  }),
);

const formatService = (service: string) => {
  return service!=null?service.includes("meal") ? "Food" : formatText(service):'';
};
</script>
