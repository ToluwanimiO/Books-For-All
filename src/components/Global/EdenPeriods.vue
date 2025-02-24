<template>
  <div>
    <div v-if="orientation === 'horizontal'">
      <ul class="eden-periods">
        <li
          v-for="(value, key, i) in periods"
          :key="i"
          :class="{
            selected: period === key,
            disabled: disabled,
          }"
          @click="disabled ? false : setPeriod(key)"
        >
          {{ value }}
        </li>
        <li
          v-if="custom.from"
          class="custom"
          @click="disabled ? false : setPeriod('custom')"
        >
          <span @click="showCustomPeriodPicker = true"
            >[{{ formatDate(custom.from, "do m, y") }}
            <span v-if="custom.from !== custom.to">
              - {{ formatDate(custom.to ? custom.to : "", "do m, y") }}</span
            >]</span
          >
        </li>
      </ul>
    </div>
    <div v-else>
      <eden-custom-period-preview
        v-if="custom.from"
        :daterange="custom"
        :loading="loading"
        @change="showCustomPeriodPicker = true"
        @clear="clear"
      />
      <el-dropdown v-else @command="setPeriod">
        <el-button type="plain" :disabled="loading || disabled">
          {{ periods[period] }} <i class="eden-icon-arrow-down"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(value, key, i) in periods"
            :key="i"
            :class="{ selected: key === period }"
            :command="key"
            >{{ value }}</el-dropdown-item
          >
          <el-dropdown-item v-if="showCustomPeriod" :command="'custom'"
            >Custom</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <eden-custom-period
      :show.sync="showCustomPeriodPicker"
      :title="customTitle"
      :button="customButton"
      @confirm="setCustomPeriod"
      @cancel="setPeriod(defaultPeriod)"
    />
  </div>
</template>

<script lang="ts" setup>
import EdenCustomPeriod from "@/components/Global/EdenCustomPeriod.vue";
import EdenCustomPeriodPreview from "@/components/Global/EdenCustomPeriodPreview.vue";
import useDate from "@/composables/date";
import { computed, onBeforeMount, ref } from "vue";

const emits = defineEmits(["set-period"]);
const { formatDate } = useDate();

const props = defineProps({
  orientation: {
    type: String,
    default: "vertical",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  defaultPeriod: {
    type: String,
    default: "today",
  },
  customPeriods: {
    type: Object,
    default() {
      return {};
    },
  },
  showCustomPeriod: {
    type: Boolean,
    default: false,
  },
  customTitle: {
    type: String,
    default: "Get data for",
  },
  customButton: {
    type: String,
    default: "Get",
  },
});

const period = ref("");

const custom = ref({
  from: null,
  to: null,
});

const showCustomPeriodPicker = ref(false);

const periods = computed(() => {
  let periods = {
    lastweek: "Last week",
    yesterday: "Yesterday",
    today: "Today",
    tomorrow: "Tomorrow",
    nexttwodays: "Next two days",
    thisweek: "This week",
    nextweek: "Next week",
  };

  let customPeriods = {
    ...props.customPeriods,
  };

  if (props.orientation === "horizontal" && props.showCustomPeriod) {
    customPeriods.custom = "Custom";
  }
  return Object.keys(props.customPeriods).length ? customPeriods : periods;
});

onBeforeMount(() => {
  period.value = props.defaultPeriod;
});

const setPeriod = (selectedPeriod: string | number) => {
  showCustomPeriodPicker.value = false;
  if (period.value === selectedPeriod) {
    return;
  }
  period.value = selectedPeriod as string;
  if (selectedPeriod === "custom") {
    console.log("rr");
    showCustomPeriodPicker.value = true;
    return;
  } else {
    custom.value.from = null;
    custom.value.to = null;
  }
  emits("set-period", {
    period: period.value,
    from: null,
    to: null,
  });
};

const setCustomPeriod = (daterange: any) => {
  emits("set-period", {
    period: "custom",
    from: daterange.from,
    to: daterange.to,
  });
  custom.value.from = daterange.from;
  custom.value.to = daterange.to;
};
const clear = () => {
  custom.value.from = null;
  custom.value.to = null;
  setPeriod(props.defaultPeriod);
};
</script>

<style lang="scss" scoped>
.eden-periods {
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
      color: var(--eden-green-secondary);
      font-weight: 500;
    }

    &.disabled {
      cursor: not-allowed !important;
    }

    &.custom {
      list-style: none;
      margin-left: 0;
      color: var(--eden-grey-primary);
      font-weight: 500;
    }
  }
}
</style>
