<template>
  <el-tag :type="setType(value)">{{ formatText(value) }}</el-tag>
</template>

<script lang="ts" setup>
import useSupport from "@/composables/support";
import useTags from "@/composables/tags";

const { formatText } = useSupport();
const { setType } = useTags();

defineProps({
  value: {
    type: String,
    default: "info",
  },
});
</script>
