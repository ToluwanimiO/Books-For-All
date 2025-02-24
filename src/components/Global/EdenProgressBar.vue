<template>
  <el-steps :active="1" :class="{ wrap: wrapBar }">
    <el-step
      v-for="(value, key, index) in activities"
      :key="index"
      :title="value.label"
      :description="value.status ? formatTime(value.time, '12h') : '-'"
      :status="checkProgress(value.status, index, activities)"
    >
      <template v-if="value.status" #icon>
        <i class="el-icon-check"></i>
      </template>
      <template v-else #icon> </template>
    </el-step>
  </el-steps>
</template>

<script lang="ts" setup>
import useDate from "@/composables/date";
import useProgress from "@/composables/progress";

const { checkProgress } = useProgress();
const { formatTime } = useDate();

defineProps({
  activities: {
    type: Object,
    default() {
      return {};
    },
  },
  wrapBar: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
