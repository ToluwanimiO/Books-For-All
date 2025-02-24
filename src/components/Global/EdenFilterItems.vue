<template>
  <div class="filter-items">
    <span class="filter-items__label">Filtering by:</span>
    <template v-for="(value, key, index) in paramsLabel">
      <div v-if="value" :key="index" class="filter-items__item">
        <span>{{ value }}</span>
        <i class="eden-icon-remove" @click="clearFilter(key)"></i>
      </div>
    </template>
    <div class="filter-items__item clear" @click="clearFilters">
      <span>Clear all filters</span>
    </div>
  </div>
</template>

<script>
import useSupport from "@/composables/support";
import useDate from "@/composables/date";

const { formatText } = useSupport();
const { formatDate } = useDate();
export default {
  
  name: "EdenFilterItem",
  props: {
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      paramsLabel: {},
    };
  },
  computed: {
    setParams: {
      get() {
        return this.params;
      },
      set(value) {
        this.$emit("update:properties", value);
      },
    },
  },
  created() {
    this.setPropertiesLabel();
  },
  methods: {
    formatText,
    formatDate,
    clearFilter(key) {
      delete this.setParams[key];
      this.$emit("clear-filter", key);
      this.setPropertiesLabel();
    },
    clearFilters() {
      this.$emit("clear-filters");
    },
    setPropertiesLabel() {
      this.paramsLabel = {};
      Object.keys(this.params).forEach((param) => {
        const { key, type, value } = this.params[param];
        if (value && value.length) {
          switch (type) {
            case "list":
              this.paramsLabel[key] =
                typeof value[0] === "number"
                  ? this.getPropertyLabel(key, value[0])
                  : this.formatText(value[0]);
              break;
            case "list-multiple":
              {
                let optionValue = "";
                value.forEach((val) => {
                  let computedOptionValue = Number.isInteger(val)
                    ? this.getPropertyLabel(key, val)
                    : this.formatText(val);
                  optionValue = `${optionValue} ${
                    optionValue.length ? "," : ""
                  } ${computedOptionValue}`;
                });
                this.paramsLabel[key] = optionValue;
              }
              break;
            case "daterange":
              {
                let start = this.formatDate(value[0], "mo d, y");
                let end = this.formatDate(value[1], "mo d, y");

                if (start === end) {
                  this.paramsLabel[key] = start;
                } else {
                  this.paramsLabel[key] = `${start} - ${end}`;
                }
              }
              break;
            default:
              break;
          }
        }
      });
    },
    getPropertyLabel(property, id) {
      let option = this.params[property].options.filter(
        (option) => option.value === id,
      );
      return option.length ? option[0].label : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-items {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  &__label {
    font-size: 0.75rem;
    color: var(--eden-grey-tertiary) !important;
    margin-right: 20px;
    display: inline-block;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 28px;
    background: var(--eden-grey-septenary);
    color: var(--eden-grey-primary);
    border-radius: 8px;

    &:not(:last-child) {
      margin-right: 7px;
    }

    .key {
      font-weight: 600;
    }

    span {
      font-size: 0.75rem;
      //margin-right: 15px;
      display: inline-block;
    }

    i {
      margin-left: 10px;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--eden-grey-primary);
    }

    &.clear {
      cursor: pointer;
      margin-right: 0;
      background: transparent;
      border: 1px solid #e2e9e6;

      span {
        margin-right: 0;
        color: var(--eden-grey-primary);
      }
    }
  }
}
</style>
