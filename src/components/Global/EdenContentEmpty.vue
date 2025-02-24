<template>
  <div class="eden-content--empty">
    <el-empty :description="text" :image-size="size" />
  </div>
</template>

<script>
export default {
  name: "EdenContentEmpty",
  props: {
    text: {
      type: String,
      default: "No data",
    },
    size: {
      type: Number,
      default: 140,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.eden-content--empty .el-empty {
  padding: 25px 0;
}

.eden-content--empty .el-empty__description p {
  color: var(--eden-grey-tertiary) !important;
  font-weight: 500;
  font-size: 1rem;
}
</style>
