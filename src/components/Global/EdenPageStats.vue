<template>
  <div class="page-stat">
    <div class="page-stat--head">
      <p v-if="title" class="title">{{ title }}</p>
      <div class="actions" :style="{ width: !title ? '100%' : 'auto' }">
        <!-- <eden-periods
          v-if="showPeriods"
          :orientation="'horizontal'"
          :custom-periods="customPeriods"
          :show-custom-period="showCustomPeriod"
          :disabled="disabled"
          @set-period="$emit('set-period', $event)"
        /> -->
        <slot name="actions" />
      </div>
    </div>
    <div class="is-flex">
      <div v-if="Object.keys(isolatedStat).length" class="page-stat--body">
        <div
          style="margin:auto;border-right:1px solid #E2E9E6;width:150px"
          class="page-stat--card"
        >
          <div class="stat">
            <div class="stat-figure">
              <h5 :class="size">{{ loading ? "-" : isolatedStat.figure }}</h5>
            </div>
            <div class="stat-description">
              <p class="font-sm text-grey-tertiary">
                {{ isolatedStat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="page-stat--body" style="width:100%">
        <div
          
          v-for="(stat, index) in stats"
          :key="index"
          :style="{
            width: cardWidth,
          }"
          style="margin:auto;"
          class="page-stat--card"
        >
          <div class="stat">
            <div class="stat-figure">
              <h5 :class="size">{{ loading ? "-" : stat.figure }}</h5>
            </div>
            <div class="stat-description">
              <p class="font-sm text-grey-tertiary">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
// import EdenPeriods from "@/components/Global/EdenPeriods.vue";
import useImage from "@/composables/image";

const { getImage } = useImage();

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  showPeriods: {
    type: Boolean,
    default: false,
  },
  periods: {
    type: Object,
    default() {
      return {};
    },
  },
  showCustomPeriod: {
    type: Boolean,
    default: true,
  },
  stats: {
    type: Array as PropType<any[]>,
    default() {
      return [];
    },
  },
  isolatedStat: {
    type: Object,
    default() {
      return {};
    },
  },
  size: {
    type: String,
    default: "regular",
  },
});

const cardWidth = computed(() => {
  const length = props.stats.length;
  if (length <= 4) {
    return "25%";
  } else if (length >= 7) {
    return "20%";
  } else {
    return `${(100 / length - 1).toFixed(0)}%`;
  }
});

const customPeriods = computed(() => {
  return Object.keys(props.periods).length
    ? props.periods
    : {
        today: "Today",
        thisweek: "This week",
        thismonth: "This month",
      };
});
</script>

<style lang="scss" scoped>
.page-stat {
  margin: 50px 0 40px;
  border-bottom: 1px solid #f0f4f2;

  &--head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    .title {
      color: var(--eden-grey-primary);
      font-size: 1rem;
      font-weight: 500;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &--periods {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;

    li {
      cursor: pointer;
      color: var(--eden-grey-quaternary);
      font-weight: 400;
      font-size: 0.75rem;
      margin: 0 11px;

      &::marker {
        color: #cbd8d2;
      }

      &:first-child {
        list-style: none;
      }

      &.selected {
        color: #14b757;
        font-weight: 500;
      }

      &.disabled {
        cursor: not-allowed;
      }
    }
  }

  &--body {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0px;
    // width: 100%;
  }

  &--card {
    padding: 10px 10px;
    transition: all 0.3s ease-in-out;

    .stat {
      &-figure {
        display: flex;
        align-items: center;
        color: var(--eden-grey-primary);
        margin-bottom: 0px;
        position: relative;

        h5 {
          &.small {
            font-size: 1.75rem;
          }
        }

        .stat-expand {
          cursor: pointer;
          position: absolute;
          opacity: 0;
          right: 25%;
          top: 10%;
        }

        span {
          font-size: 14px;
          line-height: 15.24px;

          &.stat-increase {
            color: #14b757;
          }

          &.stat-decrease {
            color: #f40529;
          }
        }
      }

      &-description {
        color: #4b6358;

        .body-text {
          font-weight: 400;
        }
      }
    }

    @media (max-width: 756px) {
      margin: 20px;
    }
  }
}
</style>
