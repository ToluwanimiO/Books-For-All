<template>
  <div class="gh-container">
    <div class="gh-container--form">
      <div class="gh-container--form__header">
        <div class="logo logo-border">
          <img :src="getImage('reset_lock.svg')" class="key-image" alt="Eden" />
        </div>
        <h2 class="header">Enter the reset code sent to your email</h2>
        <div class="sub-head">
          <span
            >A code has been sent to your email address. Enter the code below or
            <router-link :to="{ name: 'reset-code' }"
              >resend the code.</router-link
            ></span
          >
        </div>
      </div>
      <div class="gh-container--form__content">
        <el-form :model="form" label-position="top" ref="form" :rules="rules">
          <el-form-item label="Reset code" prop="code">
            <el-input type="text" v-model="form.code" />
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button
            type="primary"
            :loading="loading"
            :disabled="disableNext"
            @click="next"
            >Next</el-button
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

<script>
import useImage from "@/composables/image";
// @ is an alias to /src
const { getImage } = useImage();

export default {
  name: "ResetCode",
  components: {},
  data() {
    return {
      form: {
        code: "",
      },
      rules: {
        code: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  computed: {
    disableNext() {
      return this.form.code === "";
    },
  },
  methods: {
    getImage,
    next() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        localStorage.setItem("reset-code", this.form.code);
        this.$router.push({ name: "reset-password" });
      });
    },
  },
};
</script>
<style></style>
