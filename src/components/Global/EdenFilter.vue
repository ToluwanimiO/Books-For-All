<template>
  <el-popover
    :visible="visible"
    ref="popover"
    trigger="click"
    @show="open"
    placement="bottom-end"
    :width="width"
  >
    <div class="eden-filters" v-click-outside="onClickOutside">
      <div class="eden-filters__header">
        <span>Filter by</span>
      </div>
      <div
        v-if="loading"
        v-loading="loading"
        class="eden-filters__loader"
      ></div>
      <template v-else>
        <el-collapse accordion>
          <el-collapse-item
            v-for="(property, key, index) in setProperties"
            :key="index"
            :name="index"
            :itemprop="key"
          >
            <template #title>
              <span class="hide-icon font-sm"> {{ property.label }} </span>
            </template>

            <div class="eden-filters__body">
              <template v-if="property.type === 'list'">
                <el-input
                  v-if="property.searchable"
                  type="text"
                  v-model="property.query"
                  :prefix-icon="'el-icon-search'"
                  :placeholder="`Search for ${property.label.toLowerCase()}`"
                  @input="searchOptions(key)"
                ></el-input>
                <el-checkbox-group v-model="property.value" :max="1">
                  <el-checkbox
                    v-for="option in property.query
                      ? property.filteredOptions
                      : property.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-checkbox>
                </el-checkbox-group>
                <div
                  v-if="property.query && !property.filteredOptions.length"
                  class="empty"
                >
                  <span>No matching result</span>
                </div>
              </template>
              <template v-if="property.type === 'list-multiple'">
                <el-input
                  v-if="property.searchable"
                  type="text"
                  v-model="property.query"
                  :prefix-icon="'el-icon-search'"
                  :placeholder="`Search for ${property.label.toLowerCase()}`"
                  @input="searchOptions(key)"
                ></el-input>
                <el-checkbox-group v-model="property.value">
                  <el-checkbox
                    v-for="option in property.query
                      ? property.filteredOptions
                      : property.options"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-checkbox>
                </el-checkbox-group>
                <div
                  v-if="property.query && !property.filteredOptions.length"
                  class="empty"
                >
                  <span>No matching result</span>
                </div>
              </template>
              <template v-else-if="property.type === 'daterange'">
                <div class="date-picker">
                  <el-date-picker
                    v-model="property.value"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="From"
                    end-placeholder="To"
                    format="dd MMM, yyyy"
                    value-format="yyyy-MM-dd"
                    :unlink-panels="true"
                  />
                </div>
              </template>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="eden-filters__footer">
          <el-button type="" size="small" @click="reset"> Reset </el-button>
          <el-button type="primary" size="small" @click="filter">
            Apply filter</el-button
          >
        </div>
      </template>
    </div>
    <template #reference>
      <el-button type="" :disabled="disabled" @click="visible = true">
        <div class="icon-position eden-icon-filter mr-1"></div>
        Filters
      </el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from "vue";
import { ClickOutside as vClickOutside } from 'element-plus'
const props = withDefaults(
  defineProps<{
    width: number;
    properties: any;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    width: 255,
    properties: () => {},
    disabled: false,
    loading: true,
  },
);

const popover = ref();
const visible = ref(false);

const emit = defineEmits(["update:properties", "open", "filter", "reset"]);

const setProperties = computed<any>({
  get() {
    return props.properties;
  },
  set(value) {
    emit("update:properties", value);
  },
});
const onClickOutside = () => {
  visible.value = false
}

const searchOptions = (item: any) => {
  const property = setProperties.value[item];
  if (property.query) {
    property.filteredOptions = property.options.filter((option: any) => {
      return option.label.toLowerCase().includes(property.query.toLowerCase());
    });
  }
};

const open = () => {
  emit("open");
};

const reset = () => {
  emit("reset");
};

const filter = () => {
  emit("filter");
  visible.value = false;
};
</script>

<style lang="scss">
.eden-filters {
  &__header {
    padding: 10px 16px;
    margin-bottom: 10px;
    line-height: 1.4;

    span {
      font-size: 0.925rem;
      font-weight: 500;
    }
  }

  &__loader {
    height: 150px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background: var(--eden-grey-octonary);
    padding: 10px 16px;
    max-height: 215px;
    overflow-y: scroll;

    .empty {
      margin: 7px 0;
      text-align: center;

      span {
        font-size: 0.825rem;
      }
    }
    .el-checkbox-group {
      display: flex;
      flex-direction: column;

      .el-checkbox {
        margin: 3px 0;

        &:first-child {
          margin-top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .el-input {
      margin-bottom: 10px;

      &__inner {
        height: 32px;
        border: 1px solid #cbd8d2;
      }
    }

    .date-picker {
      display: flex;
      align-items: center;
      color: #4b6358;
      font-size: 12px;
      line-height: 16px;

      .date {
        width: calc(50% - 6px);

        .label {
          font-size: 0.75rem;
          margin-bottom: 4px;
          display: inline-block;
        }
      }

      .divider {
        width: 6px;
        height: 1px;
        margin: 10px 3px 0;
        background: #4b6358;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-top: 10px;
  }

  .el-collapse-item {
    border: none !important;
    padding: 2px 0 !important;

    .el-collapse-item__arrow {
      top: 0;
      font-size: 0.8rem;
      margin-left: 12px;
    }

    .el-collapse-item__header {
      color: var(--eden-grey-primary);
    }
  }

  .el-date-editor {
    width: 100%;

    .el-input__inner {
      padding-left: 10px;
      font-size: 0.775rem !important;
    }

    .el-input__prefix {
      top: 50%;
      right: 5px;

      i {
        font-family: "eden-icons", serif !important;
        font-size: 0.875rem;

        &:before {
          content: "\e908";
        }
      }
    }

    &.el-range-editor {
      i.el-range__icon {
        top: 50%;
        transform: translateY(-20%);
        font-family: "eden-icons", serif !important;
        font-size: 0.9rem;

        &:before {
          content: "\e908";
        }
      }

      .el-range-separator {
        position: relative;
        top: -5px;
      }
    }
  }
}
</style>
