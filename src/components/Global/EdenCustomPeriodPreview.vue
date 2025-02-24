<template>
  <div class="eden-daterange-preview">
    <el-button
      class="display"
      type="outline"
      :disabled="loading"
      @click="emits('change')"
    >
      Custom date
      <span class="text-grey-primary text-bold">
        : {{ formatDate(daterange.from, "do m, y") }} -
        {{ formatDate(daterange.to, "do m, y") }}
      </span>
    </el-button>
    <el-button type="plain" :disabled="loading" @click="emits('clear')">
      Clear Dates
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import useDate from "@/composables/date";

const { formatDate } = useDate();

const emits = defineEmits(["clear", "change"]);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  daterange: {
    type: Object,
    default() {
      return {
        from: "",
        to: "",
      };
    },
  },
});
</script>

<style lang="scss">
.eden-daterange-preview {
  display: flex;
  align-items: center;

  .date {
    height: 40px;
    background: transparent;
  }
}
</style>
