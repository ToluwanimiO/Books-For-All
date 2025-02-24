<template>
  <div v-if="loadingScreen" class="loader"></div>
  <div v-else class="gh-container d-flex justify-content-center">
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
            <el-input :type="type" v-model="form.password" />
            <div class="show-password hidden-lg" @click="showPassword">
              {{ btnText }}
            </div>
            <div class="show-password hidden-md" @click="showPassword">
              {{ btnTextMobile }}
            </div>
          </el-form-item>
        </el-form>
        <div class="actions">
          <p>
            <router-link :to="{ name: 'forgot-password' }">Forgot your password?</router-link>
          </p>
          <el-button type="primary" :loading="loading" :disabled="disableLogin" @click="login">Log in</el-button>
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
// import * as actions from "../store/action-types";
import { useAuthStore } from "../store/auth";
import useImage from "@/composables/image";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const store = useAuthStore();
const { getImage } = useImage();

const route = useRoute();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const loginForm = ref<FormInstance>();

const loading = ref(false);
const googleLoading = ref(false);
const loadingScreen = ref(false);

const type = ref("password");
const btnText = ref("Show password");
const btnTextMobile = ref("Show");

const rules = ref<FormRules>({
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

const disableLogin = computed(
  () => form.value.email === "" || form.value.password === "",
);

const getImageUrl = (image: string) => {
  return getImage(image);
};


const login = async () => {
  await loginForm.value?.validate((valid) => {
    if (!valid) {
      return;
    }
    //
    loading.value = true;
    console.log(store);
    store
      .login(form.value)
      .then((response: any) => {
        console.log(response);
        ElMessage.success({ message: response.data.message });
        router.push({ name: "dashboard" });


      })
      .catch((err) => {
        console.log(err);
        ElMessage.error({ message: err.response.data.message });
        loading.value = false;
      });

    // this.$store
    //   .dispatch(actions.LOGIN, this.form)
    //   .then((response) => {
    //     this.loading = false;
    //     const successMessage = response.data.message;
    //     this.$message({
    //       message: successMessage,
    //       type: "success",
    //     });
    //     this.$router.push({ name: "home" });
    //   })
    //   .catch((error) => {
    //     this.loading = false;
    //     const errorMessage = error.response.data;
    //     if (errorMessage.errors) {
    //       this.$message.error(errorMessage.errors.join("\n"));
    //     } else {
    //       this.$message.error(errorMessage.message);
    //     }
    //   });
  });
};

const showPassword = () => {
  if (type.value === "password") {
    type.value = "text";
    btnText.value = "Hide Password";
    btnTextMobile.value = "Hide";
  } else {
    type.value = "password";
    btnText.value = "Show Password";
    btnTextMobile.value = "Show";
  }
};

</script>

<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

.loader {
  border: 10px solid #cbd8d2;
  /* Light grey */
  border-top: 10px solid white;
  /* Blue */
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
