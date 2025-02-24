<template>
  <div class="gh-container">
    <div class="gh-container--form">
      <div class="gh-container--form__header">
        <div class="logo logo-border">
          <img :src="getImage('reset_lock.svg')" class="key-image" alt="Eden" />
        </div>
        <h2 class="header">Reset your password</h2>
        <div class="sub-head">
          <span>Enter your new password.</span>
        </div>
      </div>
      <div class="gh-container--form__content">
        <el-form :model="form" label-position="top" ref="form" :rules="rules">
          <el-form-item label="Password" prop="password">
            <el-input :type="type" v-model="form.password" />
            <div class="show-password" @click="showPassword">
              {{ btnText }}
            </div>
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button
            type="primary"
            :loading="loading"
            :disabled="disableReset"
            @click="reset"
            >Reset password and log in</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useImage from "@/composables/image";
import { resetPassword } from "../requests/auth";

const { getImage } = useImage();
export default {
  name: "ResetPassword",
  data() {
    return {
      form: {
        password: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "change",
          },
        ],
      },
      loading: false,
      type: "password",
      btnText: "Show Password",
    };
  },
  computed: {
    disableReset() {
      return this.form.password === "";
    },
  },
  methods: {
    getImage,
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },
    reset() {
      this.$refs.form.validate((valid) => {
        console.log("ji");
        if (!valid) {
          return;
        }
        this.loading = true;
        const payload = {
          code: localStorage.getItem("reset-code"),
          password: this.form.password,
        };
        resetPassword(payload)
          .then((response) => {
            this.loading = false;
            this.$message.success(response.data.message);
            this.$router.push({ name: "dashboard" });
          })
          .catch((error) => {
            console.log(error);
            this.$message.error(error.response.data.message);
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style></style>
