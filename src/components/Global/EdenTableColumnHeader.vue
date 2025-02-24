<template>
  <div
    :class="[
      'table--header',
      'text-cursor',
      { active: property === sortProperty },
    ]"
    @click="setSort"
  >
    <span>{{ label }}</span>
    <span>
      <el-icon v-if="direction === 'asc'" :size="10">
        <top />
      </el-icon>
      <el-icon v-else-if="direction === 'des'" :size="10">
        <bottom />
      </el-icon>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Top, Bottom } from "@element-plus/icons-vue";

const props = defineProps<{
  label: string;
  property: string;
  sortProperty: string;
}>();

const direction = ref<string>("asc");

const emit = defineEmits(["sort"]);

const setSort = () => {
  if (props.property !== props.sortProperty) {
    direction.value = "asc";
  } else {
    direction.value = direction.value === "asc" ? "des" : "asc";
  }
  emit("sort", direction);
};
</script>

<style lang="scss" scoped>
.table--header {
  display: inline-block;

  span {
    display: inline-block;
    white-space: pre;
    margin-right: 5px;
    font-size: 0.9rem;
  }

  &.active {
    color: #21312a !important;

    i {
      color: var(--eden-green-primary) !important;
      font-weight: bold !important;
    }
  }
}
</style>
