<template>
  <div class="gh-container d-flex justify-content-center">
    <div class="gh-container--form">
      <div class="gh-container--form__header">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="" srcset="" />
        </div>
        <h2 class="header">Log in to your account</h2>
      </div>
      <div class="gh-container--form__content">
        <el-form :model="form" label-position="top" ref="loginForm" :rules="rules">
          <el-form-item label="Email" prop="email">
            <el-input type="text" v-model="form.email" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input :type="passwordFieldType" v-model="form.password" />
            <div class="show-password hidden-lg" @click="showPassword">
              {{ passwordToggleText }}
            </div>
            <div class="show-password hidden-md" @click="showPassword">
              {{ passwordToggleText.slice(0, 4) }}
            </div>
          </el-form-item>
        </el-form>
        <div class="actions">
          <p>
            <router-link :to="{ name: 'forgot-password' }">Forgot your password?</router-link>
          </p>
          <el-button type="primary" :loading="loading" :disabled="disableLogin" @click="login(loginForm)">Log in</el-button>
          <div class="divider"></div>
        </div>
        <div class="sub-head text-center mt-3">
          <span>Don’t have an account?</span>
          <router-link :to="{ name: 'register' }">Create one here.</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../store/auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthCredentials } from "@/types";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const store = useAuthStore();
const router = useRouter();

const form = reactive<AuthCredentials>({
  email: "",
  password: "",
});
const loginForm = ref<FormInstance>();
const loading = ref(false);
const disableLogin = computed(() => form.email === "" || form.password === "");
const rules = ref<FormRules<AuthCredentials>>({
  password: [
    {
      required: true,
      message: "Password is required",
      trigger: "change",
    },
  ],
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
const passwordFieldType = ref("password");
const passwordToggleText = ref("Show password");

const login = async (formElement:FormInstance | undefined) => {
  if (!formElement) return;
  const valid = await formElement.validate();
  if (!valid) {
    return;
  }
  loading.value = true;
  try{
    const response = await store.login(form);
    console.log(response);
    router.push({ name: "dashboard" });
  }
  catch (err: any) {
    console.log(err);
    ElMessage.error(
      err?.message || "An error occurred while logging in",
    );
  } 
  finally{
    loading.value = false;
  }
  
};

const showPassword = () => {
  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    passwordToggleText.value = "Hide Password";
  } else {
    passwordFieldType.value = "password";
    passwordToggleText.value = "Show Password";
  }
};
</script>
