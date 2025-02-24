<template>
  <div class="information-card">
    <div v-if="title" class="title">
      <p class="font-sm">{{ title }}</p>
    </div>
    <slot name="content" />
  </div>
</template>

<script script="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.information-card {
  background: #ffffff;
  border: 1px solid #f0f4f2;
  border-radius: 16px;
  color: #1d352a;
  min-width: 320px;
  padding: 20px 0 0;
  margin-bottom: 24px;

  .title {
    padding: 0 8px 16px;
    border-bottom: 1px solid #f0f4f2;

    p {
      font-weight: 600;
      font-size: 0.9rem;
    }
  }

  .avatar-img {
    border-radius: 50%;
    margin-bottom: 8px;
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
}
</style>
