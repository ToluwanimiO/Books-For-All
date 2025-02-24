<template>
  <div class="settings__details" id="profile-details">
    <el-header class="d-block" :height="'70px'">
      <p class="text-bold">Profile details</p>
      <p class="smaller-text mt-1">This field is for information about you.</p>
    </el-header>

    <el-form :model="form" label-position="top" ref="form_profile" :rules="rules">
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="First name" prop="first_name">
            <el-input type="text" v-model="form.first_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Last name" prop="last_name">
            <el-input type="text" v-model="form.last_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Email address" prop="email">
            <el-input type="text" :readonly="true" v-model="form.email" />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item placeholder="e.g Chief Executive Officer" label="Your role" prop="company_role">
            <el-select class="styled-select" v-model="form.company_role" filterable allow-create>
              <el-option v-for="(role, index) in allRoles" :key="index" :label="role" :value="role">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="actions">
        <el-button type="primary" :loading="updating" @click="updateProfile" :disabled="disableSave">Save changes
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
// import PasswordCriteria from "../components/PasswordCriteria";
import { updateAdminProfile, getCountries } from "../../requests/onboarding";
import useImage from "@/composables/image";
// import * as actions from "@/store/action-types";
import { useAuthStore } from "../../store/auth";

const store = useAuthStore();
const { getImage, getCountryFlag } = useImage();

export default {
  name: "ProfileInformation",
  data() {
    return {
      dialogVisible: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        company_role: "",
      },
      loading: false,
      reloading: false,
      updating: false,
      countries: [],
      countriesList: [],
      rules: {
        first_name: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
      },
      allRoles: [
        "Accountant",
        "Administrative officer",
        "Architect",
        "Analyst",
        "Artist",
        "Baker",
        "Banker",
        "Beautician",
        "Broadcaster",
        "Career Adviser",
        "Chief Executive Officer",
        "Chief Financial Officer",
        "Chief Marketing Officer",
        "Chief Technical Officer",
        "Clerk",
        "Community Manager",
        "Country Manager",
        "Customer Service Representative",
        "Data Analyst",
        "Database Administrator",
        "Dentist",
        "Digital Marketer",
        "Doctor",
        "Engineer",
        "Events Manager",
        "Financial Adviser",
        "Food Scientist",
        "Graphic Designer",
        "Gym Instructor",
        "Happiness Engineer",
        "Health and Safety Inspector",
        "Human Resource Officer/Manager",
        "Interpreter",
        "Investment Banker",
        "Journalist",
        "Kitchen Assistant",
        "Legal Practitioner",
        "Lecture",
        "Logistics Manager",
        "Management Consultant",
        "Market Research Executive",
        "Marketing Manager",
        "Nurse",
        "Office Manager",
        "People Operations Manager",
        "Personal Assistant",
        "Photographer",
        "Procurement Manager",
        "Product Designer",
        "Product Manager",
        "Project Manager",
        "Public Relations Officer",
        "Reporter",
        "Researcher",
        "Social Worker",
        "Surveyor",
        "Systems Analyst",
        "Teacher",
        "Tour Guide",
        "Travel Agency Manager",
        "TV or Radio Presenter",
        "UX Designer",
        "Venture Capitalist",
        "Waiter",
        "Web Developer",
        "Wellness Curator",
        "Writer",
        "Zoologist",
      ],
    };
  },
  // watch: {
  //   getUserProfile() {
  //     this.form;
  //   },
  // },
  mounted() {
    console.log(store.authProfile);
    let { name, email, role } =
      store.authProfile;
    this.form.email = email;
    this.form.company_role = role != null ? role.charAt(0).toUpperCase() + role.slice(1) : "";
    this.form.first_name = name.split(" ")[0] != null ? name.split(" ")[0] : "";
    this.form.last_name = name.split(" ")[1] != null ? name.split(" ")[1] : "";
  },
  computed: {
    location() {
      // return this.$store.getters.user.eden_location
      //   ? this.$store.getters.user.eden_location
      //   : "NG";
      return store.companyProfile.country.code;
    },
    countryCode() {
      return store.companyProfile.country.code === 'NG' ? 'Nigeria' : 'Kenya'
    },
    disableSave() {
      return (
        this.form.first_name === "" ||
        this.form.last_name === "" ||
        this.form.company_role === ""
      );
    },
  },
  created() {
    getCountries().then((response) => {
      this.countries = response.data.data;
      this.countriesList = this.countries;
      console.log(response.data.data);
    });
  },
  created() {
    getCountries().then((response) => {
      this.countries = response.data.data;
      this.countriesList = this.countries;
      console.log(response.data.data);
    });
  },
  methods: {
    locationImage(location) {
      return getCountryFlag(`${location}.svg`);
    },
    //   getUserProfile() {
    //     user
    //       .userProfile(this.userId)
    //       .then((response) => {
    //         if (response.data.status) {
    //           const data = response.data.data;
    //           const profile = data.profile_details;
    //           const home_information = data.home_information;
    //           Object.keys(this.form).forEach((key) => {
    //             this.form[key] = profile[key] || home_information[key];
    //           });
    //           this.form.phone_number = this.form.phone_number.substring(3);
    //         }
    //       })
    //       .catch();
    //   },
    remoteMethod(query) {
      // options.value = data.filter((item) => item.label.startsWith(query))
      this.countriesList = this.countries.filter((country) => {
        console.log(country);
        if (country.name.toLowerCase().includes(query.toLowerCase())) {
          console.log(country.name);
          return country;
        }
      });
      console.log(this.countries);
      console.log(query);
    },
    //   getUserProfile() {
    //     user
    //       .userProfile(this.userId)
    //       .then((response) => {
    //         if (response.data.status) {
    //           const data = response.data.data;
    //           const profile = data.profile_details;
    //           const home_information = data.home_information;
    //           Object.keys(this.form).forEach((key) => {
    //             this.form[key] = profile[key] || home_information[key];
    //           });
    //           this.form.phone_number = this.form.phone_number.substring(3);
    //         }
    //       })
    //       .catch();
    //   },
    updateProfile() {
      this.$refs.form_profile.validate((valid) => {
        if (!valid) {
          return;
        }
        this.updating = true;
        let profile_details = {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          company_role: this.form.company_role,
        };
        console.log(profile_details);
        updateAdminProfile(profile_details)
          .then((response) => {
            if (response.data.status) {
              this.updating = false;
              this.$message.success("Changes Saved");
              localStorage.setItem(
                "books-for-all-user",
                JSON.stringify(response.data.data),
              );
              store.$patch({ user: response.data.data });
              this.$emit("company");
            }
          })
          .catch((error) => {
            console.log(error);
            this.updating = false;
            this.$message.success("Something went wrong");
          });
      });
    },
  },
};
</script>
<style scoped>
.code,
.code input {
  border: 0px !important;
  outline: 0px !important;
  border-top: 1px solid var(--el-border-color);
}
</style>
