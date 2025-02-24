<template>
  <div :class="['eden-container', { bordered: border, restricted: maxHeight }]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  border: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.eden-container {
  padding: 30px 35px;
  // overflow-y: scroll;
  border-radius: 8px;
  border: 1px solid transparent;

  .restricted {
    max-height: 450px;
  }

  &.bordered {
    border-color: var(--eden-grey-septenary);
  }

  &:not(:last-child) {
    margin-bottom: 40px;
  }
}
</style>
