<template>
  <el-tooltip :visible="visible" effect="light" placement="bottom">
    <div @click="visible = true" @mouseover="visible = true" @mouseleave="visible = false">
      <slot />
    </div>
    <template #content>
      <div class="eden-tooltip" @mouseleave="visible = false">
        <img
          class="mb-2"
          :src="getImage('tooltip-info.svg')"
          alt="Tooltip info"
        />
        <div>
          <slot name="content" />
        </div>
        <!-- <div class="is-flex is-justify-end mt-3">
          <el-button round class="text-primary" @click="visible = false"
            >Got it</el-button
          >
        </div> -->
      </div>
    </template>
  </el-tooltip>
</template>

<script lang="ts" setup>
import useImage from "@/composables/image";
import { ref } from "vue-demi";

const { getImage } = useImage();

const visible = ref(false);
</script>

<style lang="scss" scoped>
.eden-tooltip {
  background: white !important;
  width: 300px !important;
  max-width: 300px !important;
  padding: 20px 10px;

  img {
    height: 45px;
    width: 45px;
  }
}
</style>
