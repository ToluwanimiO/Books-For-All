<template>
  <eden-filter :width="270" :properties.sync="properties" :disabled="disabled" :loading="loading" @open="getData"
    @reset="reset" @filter="filter" />
</template>

<script lang="ts" setup>
import EdenFilter from "@/components/Global/EdenFilter.vue";
import { ElMessage } from "element-plus";
import { computed, ref, toRaw, watch } from "vue";

const emits = defineEmits(["filter"]);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  clear: {
    type: Boolean,
    default: false,
  },
});
const loading = ref(false);
const properties = ref({
  // status: {
  //   key: "customer_status",
  //   label: "Status",
  //   type: "list",
  //   options: [
  //     {
  //       label: "Active",
  //       value: "active",
  //     },
  //     {
  //       label: "Inactive",
  //       value: "inactive",
  //     },
  //   ],
  //   value: [],
  //   searchable: false,
  // },
  status: {
    key: "status",
    label: "Status",
    type: "list",
    options: [
      { label: "Available", value: "available" },
      { label: "Claimed", value: "claimed" },
    ],
    value: [],
    searchable: false,
  },
  // gradeLevel: {
  //   key: "gradeLevel",
  //   label: "Grade Level",
  //   type: "list",
  //   options: [
  //     { label: "Junior Secondary 1", value: "Junior Secondary 1" },
  //     { label: "Junior Secondary 2", value: "Junior Secondary 2" },
  //     { label: "Junior Secondary 3", value: "Junior Secondary 3" },
  //     { label: "Senior Secondary 1", value: "Senior Secondary 1" },
  //     { label: "Senior Secondary 2", value: "Senior Secondary 2" },
  //     { label: "Senior Secondary 3", value: "Senior Secondary 3" },
  //   ],
  //   value: [],
  //   searchable: false,
  // },
  // subscription: {
  //   key: "subscription",
  //   label: "Subscription",
  //   type: "list",
  //   options: [],
  //   value: [],
  // },
  // period: {
  //   key: ["start_date", "end_date"],
  //   label: "Date Joined",
  //   type: "daterange",
  //   value: [],
  // },
});

const services = computed(() => []);

const getData = () => { };
const reset = () => {
  Object.keys(properties.value).forEach((key) => {
    (properties.value as any)[key].value = [];
  });
};

const filter = () => {
  let params = {
    params: {},
    paramsLabel: {},
  };

  Object.keys(properties.value).forEach((property) => {
    const { key, type, value } = (properties.value as any)[property];
    if (value && value.length) {
      switch (type) {
        case "list":
          (params.params as any)[key] = (properties.value as any)[
            property
          ].value[0];
          (params.paramsLabel as any)[key] = toRaw(
            (properties.value as any)[property],
          );
          console.log(toRaw((properties.value as any)[property]), "keyyyy");
          break;
        case "daterange":
          (params.params as any)[key[0]] = (properties.value as any)[
            property
          ].value[0];
          (params.params as any)[key[1]] = (properties.value as any)[
            property
          ].value[1];
          (params.paramsLabel as any)[key] = (properties.value as any)[
            property
          ];
          break;
        default:
          break;
      }
    } else if (type === "list") {
      (params.params as any)[key] = "all";
      (params.paramsLabel as any)[key] = "All";
    } else {
      (params.params as any).period = "thismonth";
      (params.paramsLabel as any)[key] = "This month";
    }
  });

  if (Object.keys(params.params).length) {
    emits("filter", {
      params: params.params,
      paramsLabel: params.paramsLabel,
    });
  } else {
    ElMessage.info("Filtering requires at least one property");
  }
};

watch(
  () => props.clear,
  () => {
    reset();
  },
);
</script>

<style lang="scss" scoped></style>
