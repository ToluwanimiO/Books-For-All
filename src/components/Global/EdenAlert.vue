<template>
  <el-alert class="eden-alert" :type="type" :closable="false">
    <i :class="['eden-icon-info-circle mr-2', type]" />
    <div>
      <slot />
    </div>
  </el-alert>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  icon: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "Sushi",
  },
});
</script>

<style lang="scss">
.eden-alert {
  align-items: flex-start;
  margin-bottom: 10px;

  &.el-alert--warning.is-light {
    background-color: var(--eden-orange-octonary) !important;
    border: 1px solid var(--eden-orange-quinary) !important;
  }

  &.el-alert--info.is-light {
    background-color: var(--eden-grey-octonary) !important;
    border: 1px solid var(--eden-grey-quinary) !important;
  }

  &.el-alert--success.is-light {
    background-color: var(--eden-green-octonary) !important;
    border: 1px solid var(--eden-green-quinary) !important;
  }

  &.el-alert--danger.is-light {
    background-color: var(--eden-grey-octonary) !important;
    border: 1px solid var(--eden-grey-quinary) !important;
  }

  .el-alert__content {
    padding: 0;
  }

  .title {
    font-size: 1.25rem;
  }

  .el-alert__description {
    display: flex;
    align-items: flex-start;
    margin: 0;
    font-size: 0.9rem;
    color: var(--eden-grey-primary) !important;
    line-height: 1.6;

    i {
      &.warning {
        color: var(--eden-orange-primary);
      }
    }

    span {
      display: inline-block;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }

  .content {
    p,
    span {
      font-size: 0.875rem;
      line-height: 1.8;
    }
  }
}
</style>
