<template>
  <div class="gh-container">
    <div class="gh-container--form center-vertically">
      <div class="gh-container--form__header">
        <div class="logo logo-border">
          <img
            :src="getImage('password_key.svg')"
            class="logo-image"
            alt="Eden"
          />
        </div>
        <h2 class="header">Forgot your password?</h2>
      </div>
      <div class="gh-container--form__content">
        <div class="sub-head mb-20 mt--20 text-center">
          <span
            >Enter the email address you signed up with below and we'll send you
            a code to help reset your password.</span
          >
        </div>
        <el-form
          :model="form"
          label-position="top"
          ref="forgotPasswordForm"
          :rules="rules"
        >
          <el-form-item label="Email address" prop="email">
            <el-input type="text" v-model="form.email" />
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button
            type="primary"
            :loading="loading"
            :disabled="disableSend"
            @click="sendLink"
            >Send reset code</el-button
          >
          <p class="mt-20">
            <router-link :to="{ name: 'login' }"
              >Back to login page.</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useImage from "@/composables/image";
import { computed, ref } from "vue";
import { forgotPassword } from "../requests/auth";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

const { getImage } = useImage();
const router = useRouter();

const form = ref({
  email: "",
});

const loading = ref(false);

const forgotPasswordForm = ref<FormInstance>();

const rules = ref<FormRules>({
  email: [
    {
      required: true,
      message: "Email address is required",
      trigger: "change",
    },
    {
      type: "email",
      message: "Email address is not valid",
      trigger: "blur",
    },
  ],
});

const disableSend = computed(() => form.value.email === "");

const sendLink = async () => {
  await forgotPasswordForm.value?.validate((valid) => {
    if (!valid) {
      return;
    }
    loading.value = true;
    forgotPassword(form.value)
      .then((response) => {
        loading.value = false;
        ElMessage.success({ message: response.data.message });
        router.push({ name: "reset-code" });
      })
      .catch((error) => {
        console.log(error);
        ElMessage.error({ message: error.response.data.message });
        loading.value = false;
      });
  });
};
</script>
