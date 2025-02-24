<template>
  <div class="page--header is-flex flex-wrap justify-between">
    <div
      v-if="section && subtitle && !subsection"
      class="body-text is-flex flex-wrap page--subtitled"
    >
      <p class="font-base subtitle" @click="goBackwards(-2)">
        {{ title }}
      </p>
      <el-icon :size="10" class="mx-2">
        <arrow-right />
      </el-icon>

      <p class="font-base subtitle" @click="goBackwards(-1)">
        {{ subtitle }}
      </p>

      <el-icon :size="10" class="mx-2">
        <arrow-right />
      </el-icon>
      <p class="font-base page--title">{{ section }}</p>
    </div>

    <div
      v-if="section && subtitle && subsection"
      class="body-text is-flex flex-wrap page--subtitled"
    >
      <p class="font-base subtitle" @click="goBackwards(-3)">
        {{ title }}
      </p>
      <el-icon :size="10" class="mx-2">
        <arrow-right />
      </el-icon>

      <p class="font-base subtitle" @click="goBackwards(-2)">
        {{ subtitle }}
      </p>

      <el-icon :size="10" class="mx-2">
        <arrow-right />
      </el-icon>
      <p class="font-base subtitle" @click="goBackwards(-1)">
        {{ section }}
      </p>

      <el-icon :size="10" class="mx-2">
        <arrow-right />
      </el-icon>
      <p class="font-base page--title">{{ subsection }}</p>
    </div>

    <div
      v-else-if="subtitle && !section && !subsection"
      class="body-text is-flex flex-wrap page--subtitled"
    >
      <p class="font-base subtitle" @click="goBackwards(-1)">{{ title }}</p>

      <el-icon :size="10" class="mx-2">
        <arrow-right />
      </el-icon>

      <p class="font-base page--title">{{ subtitle }}</p>
    </div>
    <p
      v-if="title && !subtitle && !section && !subsection"
      class="head-text page--title font-lg"
    >
      {{ title }}
    </p>

    <div class="page--head-actions is-flex flex-wrap align-center">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

defineProps<{
  title?: string;
  subtitle?: string;
  section?: string;
  subsection?: string;
}>();

const router = useRouter();

const goBackwards = (index: number) => {
  router.go(index);
};
</script>

<style lang="scss" scoped>
.page {
  &--header {
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 0px;
    margin-left: -50px;
    padding-left: 30px;
    margin-right: -50px;
    padding-right: 30px;
    border-bottom: 1px solid var(--eden-grey-septenary);
  }

  &--title {
    color: var(--eden-grey-primary);
    font-weight: 600;
  }

  &--subtitled {
    align-items: center;
    color: #4b6358;
    .subtitle {
      font-weight: 400;
      color: #4b6358;
      cursor: pointer;
    }

    .page--title {
      font-weight: 500;
    }

    .separator {
      font-size: 14px;
      font-weight: 600;
      margin: 0 15px;
    }

    &.bell-icon {
      font-size: 1.5rem;
    }
  }

  &--head-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .el-dropdown,
    .el-button {
      margin: 0 10px;
    }
  }
}
</style>
