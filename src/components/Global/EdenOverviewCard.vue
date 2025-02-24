<template>
  <div class="overview-card">
    <div class="overview-card__header is-flex justify-between" :class="{borderBottom:cardType==='border'}">
      <div class="title">
        <span class="font-base">{{ title }}</span>
        <slot name="subtitle" />
      </div>
      <slot name="action" />
    </div>
    <div class="overview-card__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EdenOverviewCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: Object,
      default() {
        return {};
      },
    },
    cardType: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.overview-card {
  padding-bottom: 16px;
  // border-top: 1px solid #f0f4f2;
  .borderBottom{
    border-bottom: 1px solid #f0f4f2;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 16px;
    padding-bottom: 8px;
    font-weight: 500;

    .title {
      display: flex;
      align-items: baseline;

      > span:first-child {
        line-height: 1;
        margin-right: 10px;
      }
    }
  }
}
</style>
