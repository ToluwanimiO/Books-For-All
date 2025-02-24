<template>
  <el-dialog v-model="shouldShow" @close="closeEvent" class="modal">
    <div>
      <div class="gh-container--dialog__header">
        <div class="logo-border">
          <img
            :src="getImage('location_globe.svg')"
            class="key-image"
            alt="Eden"
          />
        </div>
        <h2 class="header">We’re coming to your city!</h2>
        <div class="sub-head">
          <span
            >Fill in your location and you’ll be the first to <br />
            know when we touch down in your city.</span
          >
        </div>
      </div>
      <div class="gh-container--dialog__content">
        <el-form :model="form" label-position="top" ref="form" :rules="rules">
          <el-row :gutter="20">
            <el-col :md="12">
              <el-form-item label="First name" prop="firstname">
                <el-input type="text" v-model="form.firstname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="Last name" prop="lastname">
                <el-input type="text" v-model="form.lastname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Email address" prop="email">
            <el-input type="text" v-model="form.email" />
          </el-form-item>
          <el-form-item label="Country" prop="country">
            <el-select
              width="100%"
              v-model="form.country"
              value-key="id"
              @change="getStates"
            >
              <el-option
                v-for="(country, index) in countries"
                :key="index"
                :label="country.name"
                :value="country"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="state" label="State" v-if="states.length">
            <el-select width="100%" v-model="form.state">
              <el-option
                v-for="(state, index) in states"
                :key="index"
                :label="state.name"
                :value="state.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Phone Number" prop="phone">
            <el-input
              v-model="form.phone"
              :maxlength="location === 'NG' ? 10 : 9"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
            >
              <template #prepend>
                <img
                  v-if="location"
                  :style="{
                    height: '15px',
                    borderRadius: '2px',
                    marginRight: '6px',
                  }"
                  :src="locationImage(location)"
                  alt="code"
                />
                <!-- <span v-else>{{ form.country.code }}</span> -->
                <span> {{ countryCode }} </span>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="actions">
          <el-button
            type="primary"
            :loading="loading"
            :disabled="disableNotify"
            @click="notify"
            >Notify me</el-button
          >
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import useImage from "@/composables/image";

import {
  waitingList,
  getAllCountries,
  getStates,
} from "../../requests/onboarding";

const { getImage, getCountryFlag } = useImage();

export default {
  name: "NewLocationForm",
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        country: {
          id: 160,
          name: "Nigeria",
          phonecode: "234",
          code: "NG",
        },
        state: "",
        phone: "",
      },
      loading: false,
      countries: [],
      states: [],
      rules: {
        firstname: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
        lastname: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
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
        country: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "Field is required",
            trigger: "blur",
          },
          // {
          //   min:location == 'NG' ? 10 :9,
          //   message: `${location == 'NG' ? 10 :9} digits required`,
          //   trigger: 'blur',
          // }
        ],
      },
    };
  },
  computed: {
    disableNotify() {
      return (
        this.form.firstname === "" ||
        this.form.lastname === "" ||
        this.form.phone === "" ||
        this.form.email === "" ||
        this.form.country === ""
      );
    },
    location() {
      return this.form.country.name === "Nigeria"
        ? "NG"
        : this.form.country.name === "Kenya"
        ? "KE"
        : "";
    },
    countryCode() {
      return "+" + this.form.country.phonecode;
    },
    countryName() {
      return this.form.country.name;
    },
    shouldShow: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      },
    },
  },
  mounted() {
    getAllCountries().then((response) => {
      this.countries = response.data.data;
    });
    this.getStates(this.form.country);
    // this.countries = Country.getAllCountries();
  },
  watch: {
    countryName() {
      this.form.state = "";
    },
  },
  methods: {
    getImage,
    locationImage(location) {
      return getCountryFlag(`${location}.svg`);
    },
    getStates(country) {
      if (!country.id) {
        return;
      }
      getStates(country.id).then((response) => {
        console.log(response);
        this.form.state = "";
        this.states = response.data.data;
      });
    },
    closeEvent() {
      this.shouldShow = false;
      this.form = {
        firstname: "",
        lastname: "",
        email: "",
        country: {
          currency: "NGN",
          flag: "🇳🇬",
          isoCode: "NG",
          name: "Nigeria",
          phonecode: "234",
        },
        state: "",
        phone: "",
      };
    },
    notify() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;
        console.log(this.form.country);
        let payload = {
          first_name: this.form.firstname,
          last_name: this.form.lastname,
          email: this.form.email,
          country_id: this.form.country.id,
          state_id: this.form.state,
          phone_number: 0 + this.form.phone,
        };
        console.log(payload);
        waitingList(payload)
          .then(() => {
            this.loading = false;
            this.$emit("success");
            this.closeEvent();
          })
          .catch((error) => {
            this.loading = false;
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
.el-dialog {
  width: 50%;
  height: 100vh !important;
  margin-top: 5vh !important;
  &__wrapper {
    margin-top: 1vh !important;
    top: 0;
  }
}
</style>
