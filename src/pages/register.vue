<template>
  <div>
    <div class="gh-container pb-5 flex justify-center">
      <div class="gh-container--form">
        <div class="gh-container--form__header">
          
          <div class="logo">
            <router-link :to="{ name: 'landing' }">
              <img src="@/assets/transparent-image.png" alt="Logo" />
            </router-link>
          </div>
          <h2 class="header">Create an account</h2>
        </div>
        <div class="gh-container--form__content">
          <el-form
            :model="form"
            label-position="top"
            ref="formRef"
            :rules="rules"
          >
            <el-form-item placeholder="e.g Donor" label="Your role" prop="role">
              <el-select class="styled-select" v-model="form.role" filterable>
                <el-option
                  v-for="(role, index) in allRoles"
                  :key="index"
                  :label="role.label"
                  :value="role.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-row :gutter="20" class="">
              <el-col :xs="24" :md="{span:12}">
                <el-form-item class="" label="First name" prop="first_name">
                  <el-input type="text" v-model="form.first_name" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :md="{span:12}">
                <el-form-item class="" label="Last name" prop="last_name">
                  <el-input type="text" v-model="form.last_name" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="" label="Email" prop="email">
              <el-input type="text" v-model="form.email" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input :type="passwordFieldType" v-model="form.password" />
              <div class="smaller-text">Use a minimum of 6 characters</div>
              <div class="show-password hidden-lg" @click="showPassword">
                {{ passwordToggleText }}
              </div>
              <div class="show-password hidden-md" @click="showPassword">
                {{ passwordToggleText.slice(0, 4) }}
              </div>
            </el-form-item>
            <el-form-item class="" label="Phone number" prop="phone_no">
              <el-input type="text" v-model="form.phone_no" />
            </el-form-item>
          </el-form>
          <div class="actions">
            <el-button
              type="primary"
              :loading="loading"
              :disabled="disableRegister"
              @click="register(formRef)"
              >Create account</el-button
            >
          </div>
          <div class="sub-head text-center mt-3">
            <span>Have an account?</span>
            <router-link :to="{ name: 'login' }">Log in.</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { computed, reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { SignUpForm } from "@/types";
import { useRouter } from "vue-router";

const store = useAuthStore();
const loading = ref(false);
const router = useRouter();

const allRoles = ref([
  { label: "Donor", value: "donor" },
  { label: "School Admin", value: "school" },
]);
const formRef = ref<FormInstance>();
const form = reactive<SignUpForm>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "",
  phone_no: "",
});
const rules = reactive<FormRules<SignUpForm>>({
  first_name: [
    {
      required: true,
      message: "Firstname is required",
      trigger: "change",
    },
  ],
  last_name: [
    {
      required: true,
      message: "Lastname is required",
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
  password: [
    {
      required: true,
      message: "Password is required",
      trigger: "change",
    },
    { min: 5, message: "Password is too short", trigger: "blur" },
  ],
  role: [
    {
      required: true,
      message: "This field is required",
      trigger: "blur",
    },
  ],
  phone_no: [
    {
      required: true,
      message: "Phone number is required",
      trigger: "change",
    },
  ],
});
const disableRegister = computed(() => {
  return (
    form.email === "" ||
    form.password === "" ||
    form.first_name === "" ||
    form.last_name === "" ||
    form.role === "" ||
    form.phone_no === ""
  );
});
const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const isValid = await formEl.validate();
  if (!isValid) return;
  loading.value = true;
  try {
    const registerPayload = {
      email: form.email,
      password: form.password,
    };
    const profilePayload = {
      first_name: form.first_name,
      last_name: form.last_name,
      role: form.role,
      phone_no: form.phone_no,
    };
    const response = await store.register(registerPayload);
    await store.createProfile({
      uid: response.user.uid,
      data: profilePayload,
    });
    ElMessage.success("Account created successfully");
    router.push({
      name: "dashboard",
    });
  } catch (err: any) {
    console.log(err);
    ElMessage.error(
      err?.message || "An error occurred while creating your account",
    );
  } finally {
    loading.value = false;
  }
};
const passwordFieldType = ref("password");
const passwordToggleText = ref("Show Password");
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