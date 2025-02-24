<template>
  <div class="gh-container">
    <div class="gh-container--form">
      <div class="gh-container--form__header">
        <div>
          <img :src="getImage('email.svg')" class="resize mb-20" alt="Eden" />
        </div>
        <h2 class="header text-center">Check your email!</h2>
        <div class="sub-head mt-4">
          <span class="text-grey-secondary"
            >Please confirm your account with the link sent to </span
          ><span class="text-bold">{{ form.email }}</span>
        </div>
      </div>
      <div class="gh-container--form__content">
        <el-form
          v-if="changeEmail"
          :model="form"
          label-position="top"
          ref="form"
          :rules="rules"
        >
          <el-form-item label="Company email" prop="email">
            <el-input type="text" v-model="form.email" />
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button
            class="resend-btn mb-2"
            :class="{ 'mt--20': !changeEmail }"
            type="primary"
            :loading="loading"
            :disabled="disableResend"
            @click="resendEmail"
            >Resend email</el-button
          >
          <p class="mt-20">
            <a @click="change">Change email address.</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useImage from "@/composables/image";
// @ is an alias to /src
import { resendEmail } from "../requests/auth";

const { getImage } = useImage();

export default {
  name: "ConfirmEmail",
  components: {},
  data() {
    return {
      form: {
        email: "youremail@gmail.com",
      },
      rules: {
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
      },
      loading: false,
      changeEmail: false,
    };
  },
  computed: {
    disableResend() {
      return this.form.email === "";
    },
  },
  mounted() {
    this.form.email = this.$route.params.email;
  },
  methods: {
    getImage,
    change() {
      this.changeEmail = true;
      this.form.email = "";
    },
    resendEmail() {
      if (!this.changeEmail) {
        this.send();
        return;
      }
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.send();
      });
    },
    send() {
      this.loading = true;
      resendEmail(this.form)
        .then((response) => {
          this.loading = false;
          this.$message.success(response.data.message);
          this.changeEmail = false;
        })
        .catch((error) => {
          console.log(error);
          this.$message.error(error.response.data.message);
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.resend-btn {
  width: fit-content !important;
}
</style>
