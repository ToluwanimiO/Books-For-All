<template>
  <el-dialog
    :title="title"
    :model-value="setShow"
    @close="emit('close')"
    append-to-body
    v-bind="$attrs"
    :show-close="false"
    :style="{ width: $attrs.width }"
  >
    <template #header="{ close, titleId }">
      <div class="eden-dialog__header">
        <div class="eden-dialog__header__text">
          <div :id="titleId" class="font-lg text-grey-primary text-bold">
            {{ title }}
          </div>
          <div class="text-grey-tertiary mt-1">{{ description }}</div>
        </div>
        <el-icon
          @click="close"
          :size="18"
          class="eden-dialog__header-icon text-grey-primary pointer"
          ><Close
        /></el-icon>
      </div>
    </template>

    <div class="eden-dialog">
      <slot />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { CircleClose, CircleCloseFilled, Close } from "@element-plus/icons-vue";
import { computed, ref } from "vue";

const props = defineProps<{
  title: string;
  description?: string;
  show?: boolean;
}>();

const emit = defineEmits(["close", "update:show"]);

const setShow = computed<any>({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
  },
});
</script>

<style lang="scss" scoped>
.eden-dialog {
  overflow-y: scroll;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
      max-width: 80%;
      word-break: keep-all;
    }

    &-icon {
      border: 1px solid var(--eden-grey-septenary);
      border-radius: 50%;
      height: 30px;
      width: 30px;
    }
  }
}
</style>
