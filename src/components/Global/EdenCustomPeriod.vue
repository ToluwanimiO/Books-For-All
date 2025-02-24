<template>
  <el-dialog
    :title="title"
    :model-value="setShow"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
    append-to-body
  >
    <el-form :model="form" label-position="top" ref="formRef">
      <el-row type="flex" :gutter="10" class="is-flex-wrap">
        <el-col :xs="24" :md="12">
          <el-form-item label="From" prop="start" :rules="validateField">
            <el-date-picker
              v-model="form.start"
              type="date"
              placeholder="Select start"
              format="dd MMM, yyyy"
              value-format="yyyy-MM-dd"
              :clearable="false"
              prefix-icon="eden-icon-calendar"
              @change="checkEndDate"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :md="12">
          <el-form-item label="To" prop="end" :rules="validateField">
            <el-date-picker
              ref="end"
              v-model="form.end"
              type="date"
              placeholder="Select end"
              value-format="yyyy-MM-dd"
              format="dd MMM, yyyy"
              :clearable="false"
              :picker-options="{
                disabledDate: disableDates,
              }"
              prefix-icon="eden-icon-calendar"
              :disabled="form.start === ''"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer justify-between">
      <el-button plain @click="cancel">Cancel</el-button>
      <el-button type="success" :disabled="disable" @click="confirm">{{
        button
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts" setup>
import useDate from "@/composables/date";
import useValidation from "@/composables/validation";
import { FormInstance } from "element-plus";
import { ref, WritableComputedRef, computed } from "vue";

const { formatDate } = useDate();
const { validateField } = useValidation();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Get",
  },
  button: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:show", "cancel", "confirm"]);
const end = ref();
const formRef = ref<FormInstance>();

const value = ref("");
const form = ref({
  start: "",
  end: "",
});
const loading = ref(false);

const setShow: WritableComputedRef<boolean> = computed({
  get(): boolean {
    return props.show;
  },
  set(value: boolean): void {
    emits("update:show", value);
  },
});

const disable = computed(() => {
  return form.value.start === "" && form.value.end === "";
});

const checkEndDate = () => {
  if (form.value.end && form.value.end < form.value.start) {
    form.value.end = "";
  }
  end.value?.focus();
};

const disableDates = (time: string) => {
  return (
    new Date(formatDate(time, "y-m-d")).getTime() <
    new Date(form.value.start).getTime()
  );
};

const cancel = () => {
  setShow.value = false;
  emits("cancel");
  form.value.start = "";
  form.value.end = "";
};

const confirm = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) {
      return false;
    }

    emits("confirm", {
      from: form.value.start,
      to: form.value.end,
    });
    setShow.value = false;
    formRef.value?.resetFields();
  });
};
</script>
