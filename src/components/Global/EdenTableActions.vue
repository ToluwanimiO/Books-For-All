<template>
  <div class="table-heading">
    <div class="table-heading__title">
      <div v-if="title" class="font-md text-bold mr-3">{{ title }}</div>
      <el-input
        v-if="showSearch"
        v-model="searchQuery"
        type="text"
        :prefix-icon="Search"
        placeholder="Search"
        @keyup.enter="emit('search', searchQuery)"
      ></el-input>
      <slot name="title"></slot>
    </div>
    <div class="table-heading__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    title: string;
    showSearch?: boolean;
  }>(),
  {
    showSearch: true,
  },
);

const searchQuery = ref("");

const emit = defineEmits(["search"]);

watch(searchQuery, () => {
  if (searchQuery.value === "") {
    emit("search", searchQuery.value);
  }
});
</script>

<style lang="scss" scoped>
.table-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  &__title {
    display: flex;
    align-items: center;

    .subtitle {
      margin-right: 20px;
      font-weight: 500;
    }

    .el-input {
      width: 200px;
      font-weight: 400;

      @media (max-width: 525px) {
        width: 90%;
        margin: 10px 0;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
  }
}
</style>
