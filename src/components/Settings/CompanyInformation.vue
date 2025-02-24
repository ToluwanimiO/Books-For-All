<template>
  <h1 class="hidden-md margin-bottom-32">Company Settings</h1>
  <div class="settings__details" id="profile-details">
    <el-header class="d-block">
      <p class="text-bold">Company Information</p>
      <span v-if="!isBusiness" class="error-message">
        <!-- <i class="eden-icon-info-circle"></i> -->
        This is not a business account, switch to a business account to update
        company info
      </span>
    </el-header>
    <el-form :model="form" label-position="top" ref="form_profile">
      <el-row :gutter="20">
        <el-col :md="24">
          <el-form-item label="Company name" prop="name">
            <el-input type="text" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :md="12">
          <el-form-item
            label="Company size"
            prop="last_name"
            disabled
          >
            <el-input type="text" v-model="form.last_name"></el-input>
          </el-form-item>
        </el-col> -->
      </el-row>

      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Country" prop="country_id">
            <el-select
              class="styled-select"
              v-model="form.country_id"
              filterable
              @change="changeCountry"
            >
              <el-option
                v-for="(country, index) in countries"
                :key="index"
                :label="country.name"
                :value="country.id"
              >
                <span style="float: left">
                  <img
                    :style="{
                      height: '15px',
                      borderRadius: '2px',
                    }"
                    :src="
                      locationImage(country.name === 'Nigeria' ? 'NG' : 'KE')
                    "
                    alt="code"
                /></span>
                <span style="margin-left: 10px">{{ country.name }}</span>
              </el-option>
              <!-- <el-option value=""
                >Can’t find your location?
                <a @click="showNewLocationForm = true">Click here.</a>
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="State" prop="state_id">
            <el-select
              class="styled-select"
              v-model="form.state_id"
              filterable
              allow-create
            >
              <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.name"
                :value="state.id"
              >
              </el-option>
              <!-- <el-option value=""
                >Can’t find your location?
                <a @click="showNewLocationForm = true">Click here.</a>
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item label="Location Area" prop="location_area_id">
            <el-select
              class="styled-select"
              v-model="form.location_area_id"
              filterable
            >
              <el-option
                v-for="(location, index) in locationareas"
                :key="index"
                :label="location.name"
                :value="location.id"
              >
              </el-option>
              <!-- <el-option value=""
                >Can’t find your location?
                <a @click="showNewLocationForm = true">Click here.</a>
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="Address" prop="address">
            <el-input type="text" v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="actions">
        <el-button
          type="primary"
          :loading="updating"
          @click="updateProfile"
          :disabled="disableSave || !isBusiness"
          >Save changes
        </el-button>
      </div>
    </el-form>
  </div>
  <new-location-form v-model="showNewLocationForm" @success="addedLocation" />
  <new-location-success-dialog v-model="showNewLocationSuccessDialog" />
</template>
<script>
// import PasswordCriteria from "../components/PasswordCriteria";
import {
  getCountries,
  getStates,
  getLocationAreas,
} from "../../requests/onboarding";
import { updateCompanyProfile } from "../../requests/onboarding";
import NewLocationForm from "./NewLocationForm.vue";
import NewLocationSuccessDialog from "./NewLocationSuccessDialog.vue";
import { useAuthStore } from "../../store/auth";
import useImage from "@/composables/image";
import axios from "axios";
const store = useAuthStore();
const { getCountryFlag } = useImage();
// import * as actions from "@/store/action-types";
export default {
  name: "CompanyInformation",
  components: { NewLocationForm, NewLocationSuccessDialog },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        country_id: "",
        state_id: "",
        location_area_id: "",
        address: "",
      },
      countries: [],
      locationareas: [],
      states: [],
      updating: false,
      showNewLocationForm: false,
      showNewLocationSuccessDialog: false,
    };
  },
  created() {
    getCountries().then((response) => {
      this.countries = response.data.data;
    });
  },
  mounted() {
    if (this.isBusiness && !Object.keys(store.companyInfo).length) {
      store.getCompanyInfo(store.authProfile.company_id).then((response) => {
        let { name, country_id, state_id, address, location_area_id } =
          response.data.data;
        this.form.name = name != null ? name : "";
        this.form.country_id = country_id != null ? country_id : "";
        this.form.state_id = state_id != null ? state_id : "";
        this.form.address = address != null ? address : "";
        this.form.location_area_id =
          location_area_id != null ? location_area_id : "";
        if (this.form.country_id) {
          this.getStates(this.form.country_id, "set");
        }
      });
      console.log(this.form);
      return;
    }

    console.log(store.companyProfile);
    let { name, country_id, state_id, location_area_id, address } =
      store.companyProfile;
    this.form.name = name != null ? name : "";
    this.form.country_id = country_id != null ? country_id : "";
    this.form.state_id = state_id != null ? state_id : "";
    this.form.address = address != null ? address : "";
    this.form.location_area_id =
      location_area_id != null ? location_area_id : "";
    if (this.form.country_id) {
      this.getStates(this.form.country_id, "set");
    }
    console.log(this.form);
  },
  watch: {
    countryId() {
      if (this.countryId) {
        let location = this.countryId === 160 ? "NG" : "KE";
        axios.defaults.headers.common["X-Eden-Location"] = location;
        getLocationAreas().then((response) => {
          this.locationareas = response.data.data;
        });
      }
    },
  },
  computed: {
    location() {
      // return this.$store.getters.user.eden_location
      //   ? this.$store.getters.user.eden_location
      //   : "NG";
      return "NG";
    },
    isBusiness() {
      return store.authProfile.company_id === null ? false : true;
    },
    countryCode() {
      return this.location === "NG" ? "234" : "254";
    },
    countryId(){
      return this.form.country_id
    },
    disableSave() {
      return (
        !this.form.name ||
        !this.form.country_id ||
        !this.form.state_id ||
        !this.form.location_area_id ||
        !this.form.address
      );
    },
  },
  methods: {
    locationImage(location) {
      return getCountryFlag(`${location}.svg`);
    },
    addedLocation() {
      this.showNewLocationForm = false;
      this.showNewLocationSuccessDialog = true;
    },
    changeCountry() {
      this.getStates(this.form.country_id);
      let location = this.form.country_id === 160 ? "NG" : "KE";
      axios.defaults.headers.common["X-Eden-Location"] = location;
      this.form.location_area_id = "";
      this.getLocationAreas();
    },
    getLocationAreas() {
      getLocationAreas().then((response) => {
        this.locationareas = response.data.data;
        console.log(this.locationareas);
      });
    },
    getStates(value, state = "reset") {
      if (!value) {
        return;
      }
      getStates(value).then((response) => {
        console.log(response);
        if (state === "reset") {
          this.form.state_id = "";
        }
        let stateAreas = value === 113 ? "Nairobi" : "Lagos";
        this.states = response.data.data.filter(
          (item) => item.name === stateAreas,
        );
        console.log(this.states);
      });
    },
    updateProfile() {
      this.$refs.form_profile.validate((valid) => {
        if (!valid) {
          return;
        }
        this.updating = true;
        updateCompanyProfile(this.form, store.authProfile.company_id)
          .then((response) => {
            if (response.data.status) {
              this.$message.success("Changes Saved");
              store.$patch({ companyInfo: response.data.data });
              store.getCompanyInfo(store.authProfile.company_id);
              this.updating = false;
              this.$router.push({ name: "subscriptions" });
              // let storedData = JSON.parse(
              //   localStorage.getItem("eden-greenhouse-user")
              // );
              // (storedData.customer.name =
              //   this.form.first_name + " " + this.form.last_name),
              //   localStorage.setItem(
              //     "eden-greenhouse-user",
              //     JSON.stringify(storedData)
              //   );
              // this.$store.commit("USER", storedData);
            }
          })
          .catch((error) => {
            console.log(error);
            this.updating = false;
            this.$message.error("Something went wrong");
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.error-message {
  font-size: 12px;
  color: #f56e6e;
}
a {
  color: var(--eden-green-primary);
}
</style>
