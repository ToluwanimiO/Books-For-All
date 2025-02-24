<template>
  <el-avatar :size="size" :src="src" @error="errorHandler">
    <img
      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    />
  </el-avatar>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 32,
  },
});

const errorHandler = () => true;
</script>

<style lang="scss" scoped>
.user-avatar {
  height: 32px;
  width: 32px;
  object-fit: cover;
  border-radius: 100px;
}
</style>
