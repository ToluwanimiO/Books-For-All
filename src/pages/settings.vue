<template>
  <eden-page-header title="Settings" />
  <div>
    <div class="settings">
      <el-container>
        <el-aside class="hidden-lg">
          <el-menu :default-openeds="['1', '3']">
            <el-menu-item-group>
              <template>
                <h1>Profile Settings</h1>
              </template>
              <el-menu-item index="1" @click="active = 'profile'">
                Profile Details
              </el-menu-item>
              <!-- <el-menu-item @click="active = 'company'" index="2"
                >Company Information
                <span class="dot" v-if="!isCompanyProfileFilled"></span
              ></el-menu-item> -->
              <el-menu-item @click="active = 'password'" index="3"
                >Password</el-menu-item
              >
            </el-menu-item-group>
          </el-menu>
        </el-aside>

        <el-main>
          <template
            :class="{
              'd-none': active !== 'profile',
              'd-block': active == 'profile',
            }"
            ><profile-information @company="routeToCompany"
          /></template>
          <template
            :class="{
              'd-none': active !== 'company',
              'd-block': active == 'company',
            }"
            ><company-information
          /></template>
          <template
            :class="{
              'd-none': active !== 'password',
              'd-block': active == 'password',
            }"
            ><password
          /></template>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import EdenCard from "@/components/Global/EdenCard.vue";
import EdenContentLoader from "@/components/Global/EdenContentLoader.vue";
import EdenPageHeader from "@/components/Global/EdenPageHeader.vue";
import ProfileInformation from "../components/Settings/ProfileInformation.vue";
import Password from "../components/Settings/Password.vue";
// import CompanyInformation from "../components/Settings/CompanyInformation.vue";
import { useAuthStore } from "../store/auth";
const store = useAuthStore();
// import user from "@/requests/user";
// import * as actions from "@/store/action-types";
export default {
  name: "Settings",
  components: {
    ProfileInformation,
    // CompanyInformation,
    Password,
    EdenCard,
    EdenContentLoader,
    EdenPageHeader,
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        newPassword: "",
        oldPassword: "",
        birthday: "",
        country: "",
        state: "",
        landmark: "",
        location_area_id: null,
        home_address: "",
        phone_number: "",
      },
      fetching: false,
      loading: false,
      reloading: false,
      updating: false,
      type: "password",
      btnText: "Show Password",
      passwordChangeDisabled: true,
      active: "profile",
    };
  },
  mounted() {
    console.log(this.$route);
    if (
      Object.keys(this.$route.params).length &&
      this.$route.params.view == "company"
    ) {
      this.active = "company";
    }
  },
  computed: {
    location() {
      // return this.$store.getters.user.eden_location
      //   ? this.$store.getters.user.eden_location
      //   : "NG";
      return "NG";
    },
    onboarding() {
      return store.onboarding;
    },
    companyProfile() {
      return store.companyProfile;
    },
    isCompanyProfileFilled() {
      return this.companyProfile.name == null ? false : true;
    },
    // locationareas() {
    //   return this.$store.getters.location_areas;
    // },
    // countryCode() {
    //   return this.location === "NG" ? "234" : "254";
    // },
    // userId() {
    //   return this.$store.getters.user.customer.id;
    // },
  },
  methods: {
    routeToCompany() {
      if (!this.isCompanyProfileFilled) {
        this.active = "company";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  left: 140px;
  top: 25px;
  border-radius: 50%;

  /* Green/Primary */

  background: #03a84e;
}
</style>
