<template>
  <div>
    <div class="gh-container pb-5 d-flex justify-content-center">
      <div class="gh-container--form">
        <div class="gh-container--form__header">
          <div class="logo">
            <img src="../assets/logo.svg" alt="" srcset="" />
          </div>
          <h2 class="header">Create an account</h2>
        </div>
        <div class="gh-container--form__content">
          <el-form class="" :model="form" label-position="top" ref="form" :rules="rules">
            <template v-if="step === 1">
              <el-form-item placeholder="e.g Chief Executive Officer" label="Your role" prop="role">
                <el-select class="styled-select" v-model="form.role" filterable allow-create>
                  <el-option v-for="(role, index) in allRoles" :key="index" :label="role"
                    :value="role.toLocaleLowerCase()">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-row :gutter="20" class="">
                <el-col :span="form.role == 'school' ? 24 : 12">
                  <el-form-item class="" :label="form.role == 'school' ? 'School Name' : 'First name'
                    " prop="first_name">
                    <el-input type="text" v-model="form.first_name" />
                  </el-form-item>
                </el-col>
                <el-col v-if="form.role !== 'school'" :span="12">
                  <el-form-item class="" label="Last name" prop="last_name">
                    <el-input type="text" v-model="form.last_name" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="" label="Email" prop="email">
                <el-input type="text" v-model="form.email" />
              </el-form-item>

              <el-form-item label="Password" prop="password">
                <el-input :type="type" v-model="form.password" />
                <div class="smaller-text">Use a minimum of 6 characters</div>
                <div class="show-password hidden-lg" @click="showPassword">
                  {{ btnText }}
                </div>
                <div class="show-password hidden-md" @click="showPassword">
                  {{ btnTextMobile }}
                </div>
              </el-form-item>
            </template>

            <template v-if="step === 2 && form.role === 'school'">
              <span class="text-cursor" @click="step = 1">
                <el-icon :size="10" color="#000"> <arrow-left /> </el-icon><span class="font-md ml-1">Back</span></span>
              <el-form-item class="mt-4" label="Country" prop="country">
                <el-select class="styled-select" v-model="form.location.country" value-key="id" filterable @change="getStates">
                  <el-option v-for="(country, index) in countries" :key="country.id" :label="country.name"
                    :value="country" >
                    <span style="margin-left: 10px">{{ country.name }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="State" prop="state">
                <el-select class="styled-select" v-model="form.location.state" filterable allow-create>
                  <el-option v-for="(state, index) in states" :key="index" :label="state.name" :value="state.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="" label="Address" prop="address">
                <el-input type="text" v-model="form.location.address" />
              </el-form-item>
              <el-form-item class="" label="Library Book Limit
" prop="libraryLimit">
                <el-input-number v-model="form.libraryLimit" />
              </el-form-item>
            </template>
          </el-form>
          <div class="actions">
            <el-button v-if="step == 1 && form.role == 'school'" type="primary" :disabled="disableNext"
              @click="next">Next</el-button>
            <el-button v-else type="primary" :loading="loading" :disabled="disableRegister" @click="register">Create
              account</el-button>
          </div>
          <div class="sub-head text-center mt-3">
            <span>Have an account?</span>
            <router-link :to="{ name: 'login' }">Log in.</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <new-location-form v-model="showNewLocationForm" @success="addedLocation" />
  <new-location-success-dialog v-model="showNewLocationSuccessDialog" />
</template>

<script>
// import defaultConfig from "../data/default-service-config";
// import auth from "@/requests/auth";
// import * as actions from "../store/action-types";
import { getCountries, getStates } from "../requests/onboarding";
import useImage from "@/composables/image";
import { useAuthStore } from "../store/auth";
import NewLocationForm from "@/components/Settings/NewLocationForm.vue";
import NewLocationSuccessDialog from "@/components/Settings/NewLocationSuccessDialog.vue";

const { getImage, getCountryFlag } = useImage();

const store = useAuthStore();

export default {
  name: "Register",
  components: { NewLocationForm, NewLocationSuccessDialog },
  data() {
    return {
      step: 1,
      // logoImg,
      countries: [],
      showNewLocationForm: false,
      showNewLocationSuccessDialog: false,
      states: [],
      form: {
        first_name: "",
        last_name: "",
        // location: {
        //   country: "",
        //   state: "",
        //   address: "",
        // },
        // libraryLimit: 1,
        email: "",
        password: "",
        role: "",
        phone_no:""
      },
      loading: false,
      googleLoading: false,
      type: "password",
      btnText: "Show Password",
      rules: {
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "change",
          },
          { min: 5, message: "Password is too short", trigger: "blur" },
        ],
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
        // role: [{
        //   required: true,
        //   message: 'This field is required',
        //   trigger: 'blur',
        // }]
      },
      allRoles: ["Student", "Donor", "School"],
    };
  },
  created() {
    getCountries().then((response) => {
      console.log(response)
      this.countries = response.data;
    });
  },
  computed: {
    disableRegister() {
      return (
        (this.form.role === "school" && (this.form.location.country === "" || this.form.location.address === "")) ||
        (this.form.role !== "school" && (this.form.email === "" || this.form.password === ""))
      );
    },
    disableNext() {
      return (
        this.form.email === "" ||
        this.form.password === "" ||
        !this.form.role.length
      );
    },
  },
  methods: {
    addedLocation() {
      this.showNewLocationForm = false;
      this.showNewLocationSuccessDialog = true;
    },
    next() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        this.step = this.step === 1 ? 2 : 1;
      });
    },
    locationImage(location) {
      return getCountryFlag(`${location}.svg`);
    },
    getStates(value) {
      if (!value) {
        return;
      }
      console.log(value);
      getStates(value.iso2).then((response) => {
        // if(value === 113){
        console.log(response)
        this.states = response.data
      });
    },
    getImageUrl(image) {
      return getImage(image);
    },
    async register() {
      this.loading = true;
      try{
        const valid = await new Promise((resolve)=>{
          this.$refs.form.validate((v)=>resolve(v))
        })
        if (!valid) return
        let registerPayload = {
          email: this.form.email,
          password: this.form.password,
        };
        let profilePayload = {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          role: this.form.role,
          phone_no:this.form.phone_no
        };
        
        const response = await store.register(registerPayload)
        console.log(response);
        const resp = await store.updateProfile({
          uid: response.user.uid,
          data: profilePayload
        })
        this.$message.success("Account created successfully");
        // this.$router.push({
          //   name: "dashboard",
          // });
          // this.loading = false;
      } catch (err) {
        console.log(err.message)
        this.$message.error(err.message)

      } finally {
        this.loading = false
      }
      
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },
  },
};
</script>
<style>
.or-divider {
  margin-top: 10px;
  border-top: 1px solid #e2e9e6;
  width: 45%;
}

.long-container {
  height: 100vh;
  overflow: auto;
  margin-top: 100px;
  padding-bottom: 100px;
}
</style>
