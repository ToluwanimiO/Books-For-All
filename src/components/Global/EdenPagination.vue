<template>
  <div class="main--pagination is-flex align-center justify-end">
    <span class="font-sm page--count"
      >{{ from }} - {{ to }} of {{ total }}</span
    >
    <el-input
      class="input-page"
      type="text"
      v-model="pageInput"
      placeholder="1"
      @change="goToPage"
    >
      <template #append>
        <span @click="goToPage">
          <el-icon color="#000">
            <arrow-right />
          </el-icon>
        </span>
      </template>
    </el-input>

    <el-pagination
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="setPage"
      @current-change="updateCurrentPage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed, onBeforeMount, ref, WritableComputedRef } from "vue";

const emits = defineEmits(["update:currentPage","update"]);

const props = defineProps({
  from: {
    type: Number,
    default: 1,
  },
  to: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 1,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 50,
  },
});

const pageInput = ref(1);
const lastPage = computed(() => {
  return Math.max(1, Math.ceil(props.total / props.pageSize));
});

const setPage: WritableComputedRef<number> = computed({
  get(): number {
    return props.currentPage;
  },
  set(value: number): void {
    emits("update:currentPage", value);
    emits("update", value);
  },
});

onBeforeMount(() => {
  pageInput.value = setPage.value;
});

const updateCurrentPage = (page: number) => {
  pageInput.value = page;
  setPage.value = page;
};

const goToPage = () => {
  if (pageInput.value === setPage.value) {
    return;
  }

  if (pageInput.value > lastPage.value) {
    ElMessage.error("Page number out of range");
    return;
  }

  if (pageInput.value) {
    setPage.value = pageInput.value;
  } else {
    ElMessage.error("You have to specify a page number");
  }
};
</script>

<style lang="scss">
.main--pagination {
  margin-top: 32px;
  .page--count {
    color: #4b6358;
    font-weight: 400;
    margin-right: 16px;
  }

  .input-page {
    width: 90px !important;
  }
  .el-input {
    border-radius: 0px !important;
    width: 90px !important;
    height: 50px !important;
    padding: 10px 5px !important;
    color: #0f241b;
    margin-right: 16px;

    .el-input__wrapper {
      border-right: none !important;
      padding: 0 10px !important;
      text-align: center;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
      border-right-color: transparent !important;
    }

    .el-input__inner {
      border-right: none !important;
      padding: 0 10px !important;
      text-align: center;

      &:focus + .el-input-group__append {
        border-color: #03a84e !important;
      }
    }

    .el-input-group__append {
      cursor: pointer;
      background: transparent;
      border-left: none !important;
      padding: 0 8px;
    }
  }
}
</style>
