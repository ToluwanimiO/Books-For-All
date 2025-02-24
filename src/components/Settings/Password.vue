<template>
  <div class="settings__details" id="profile-details">
    <el-header class="d-block">
      <p class="text-bold">Password</p>
    </el-header>

    <el-form
      :model="form"
      label-position="top"
      ref="form_profile"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Old password" prop="first_name">
            <el-input :type="type" v-model="form.current_password"></el-input>
            <div class="show-password hidden-lg" @click="showPassword">
              {{ btnText }}
            </div>
            <div class="show-password hidden-md" @click="showPassword">
              {{ btnTextMobile }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="24">
          <el-form-item label="New password" prop="last_name">
            <el-input :type="typeNew" v-model="form.new_password"></el-input>
            <div class="show-password hidden-lg" @click="showPassword('new')">
              {{ btnNewText }}
            </div>
            <div class="show-password hidden-md" @click="showPassword('new')">
              {{ btnNewTextMobile }}
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="actions">
        <el-button
          type="primary"
          :loading="updating"
          @click="updatePassword"
          :disabled="disableSave"
          >Save changes
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
// import PasswordCriteria from "../components/PasswordCriteria";
import { changePassword } from "../../requests/settings";
// import * as actions from "@/store/action-types";
import { useAuthStore } from "../../store/auth";
const store = useAuthStore();
export default {
  name: "Password",
  data() {
    return {
      dialogVisible: false,
      type: "password",
      btnText: "Show Password",
      btnTextMobile: "Show",
      typNewe: "password",
      btnNewText: "Show Password",
      btnNewTextMobile: "Show",
      form: {
        current_password: "",
        new_password: "",
      },
      updating: false,
      rules: {
        current_password: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
        new_password: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    location() {
      // return this.$store.getters.user.eden_location
      //   ? this.$store.getters.user.eden_location
      //   : "NG";
      return "NG";
    },
    countryCode() {
      return this.location === "NG" ? "234" : "254";
    },
    disableSave() {
      return this.form.current_password === "" || this.form.new_password === "";
    },
    user() {
      return store.authProfile;
    },
  },
  methods: {
    showPassword(value = "old") {
      if (value === "new") {
        if (this.typeNew === "password") {
          this.typeNew = "text";
          this.btnNewText = "Hide Password";
          this.btnNewTextMobile = "Hide";
        } else {
          this.typeNew = "password";
          this.btnNewText = "Show Password";
          this.btnNewTextMobile = "Show";
        }
      } else {
        if (this.type === "password") {
          this.type = "text";
          this.btnText = "Hide Password";
          this.btnTextMobile = "Hide";
        } else {
          this.type = "password";
          this.btnText = "Show Password";
          this.btnTextMobile = "Show";
        }
      }
    },
    getCountryFlag(image) {
      if (!image) {
        return "";
      }
      return `../../assets/img/flags/${image}.svg`;
    },
    updatePassword() {
      this.$refs.form_profile.validate((valid) => {
        if (!valid) {
          return;
        }
        this.updating = true;
        console.log(this.form);
        changePassword(this.user.id, this.form)
          .then((response) => {
            console.log(response);
            if (response.data.status) {
              this.updating = false;
              this.$message.success("Changes Saved");
              this.form.new_password = "";
              this.form.current_password = "";
            }
          })
          .catch((error) => {
            this.updating = false;
            console.log(error);
            const errorMessage = error.response.data;
            if (errorMessage.errors) {
              this.$message.error(errorMessage.errors.join("\n"));
            } else {
              this.$message.error(errorMessage.message);
            }
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.section-details {
  padding: 20px;
}
</style>
