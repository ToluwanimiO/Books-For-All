<template>
  <page-header :title="loading ? '' : 'Register New School'" />
  <div class="px-6 pb-5 w-80 m-auto">
    <el-card class="donation-form">
      <h2 class="text-xl font-semibold mb-4">Onboard School</h2>

      <el-form :form="form" label-width="120px">
        <el-form-item class="" :label="'School Name'" prop="first_name">
          <el-input type="text" v-model="form.first_name" />
        </el-form-item>
        Do you want to set your account as the school's contact details
        <el-switch v-model="userAsContact"></el-switch>
        <template v-if="!userAsContact">
          <el-row :gutter="20" class="">
            <el-col>
              <el-form-item
                class=""
                label="Contact's First name"
                prop="first_name"
              >
                <el-input type="text" v-model="form.first_name" />
              </el-form-item>
            </el-col>
            <el-col v-if="form.role !== 'school'">
              <el-form-item
                class=""
                label="Contact's Last name"
                prop="last_name"
              >
                <el-input type="text" v-model="form.last_name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="" label="Contact's Email" prop="email">
            <el-input type="text" v-model="form.email" />
          </el-form-item>
          <el-form-item class="" label="Contact's Phone number" prop="email">
            <el-input type="text" v-model="form.email" />
          </el-form-item>
        </template>
        <el-form-item class="mt-4" label="Country" prop="country">
          <el-select
            class="styled-select"
            v-model="form.location.country"
            value-key="id"
            filterable
            @change="getStates"
          >
            <el-option
              v-for="(country, index) in countries"
              :key="country.id"
              :label="country.name"
              :value="country"
            >
              <span style="margin-left: 10px">{{ country.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="State" prop="state">
          <el-select
            class="styled-select"
            v-model="form.location.state"
            filterable
            allow-create
          >
            <el-option
              v-for="(state, index) in states"
              :key="index"
              :label="state.name"
              :value="state.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="" label="Address" prop="address">
          <el-input type="text" v-model="form.location.address" />
        </el-form-item>
      </el-form>

      <el-button
        :loading="loading"
        type="success"
        style="margin-top: 20px"
        :disabled="donationList.length === 0"
        @click=""
      >
        Submit Donation
      </el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { verifyAccount } from '../../requests/auth'
import { useAuthStore } from '../../store/auth'
import { getCountries, getStates } from '@/requests/onboarding'
import EdenContentLoader from '../../components/Global/EdenContentLoader.vue'
import EdenCard from '../../components/Global/EdenCard.vue'
import { computed, onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getSubscriptions } from '@/requests/subscriptions'
const authStore = useAuthStore()

// Reactive state
// const selectedSchool = ref(null);
let form = reactive({
  first_name: '',
  last_name: '',
  location: {
    country: '',
    state: '',
    address: '',
  },
  libraryLimit: 1,
  email: '',
  password: '',
  role: '',
  phone_no: '',
})
const donationList = ref([])
const countries: any = ref([])
let states: any = ref([])
const userAsContact = ref(false)

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const activeCard = ref(true)

const onboarding = computed(() => authStore.onboarding)
const user = computed(() => authStore.authProfile)

const fullName = computed(() => {
  console.log(user)
  if (user.value.first_name == null) {
    return ''
  }
  let fname =
    user.value.first_name && user.value.first_name != null
      ? user.value.first_name
      : ''
  return fname
})

const companyProfile = computed(() => authStore.companyProfile)

const goBack = () => {
  router.back()
}
const subscriptions = ref([])
const setActiveCard = () => {
  activeCard.value = !activeCard.value
}

// const getStatesFunc = (value:any) => {
//       if (!value) {
//         return;
//       }
//       console.log(value);
//       getStates(value.iso2).then((response:any) => {
//         // if(value === 113){
//         console.log(response)
//         states = response.data
//       });
//     }

// const goHome = () => {
//   // const role = this.$store.getters.user_role;

//   // if (role) {
//   //   if (["steward", "ofa"].includes(this.role)) {
//   //     this.$router.push({ name: "production-provisions.index" });
//   //   } else {
//   //     this.$router.push({ name: "customers.index" });
//   //   }
//   // } else {
//   router.push({ name: "login" });
//   // }
// };

onMounted(() => {
  getCountries().then((response: any) => {
    console.log(response)
    countries.value = response.data
  })
})
</script>

<style scoped lang="scss">
.eden-error {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // h1 {
  //   font-size: 3.5rem;
  //   color: #21312a;
  //   margin-bottom: 20px;
  //   line-height: 0.6;
  //   text-transform: uppercase;
  // }

  h3 {
    font-size: 2rem;
  }

  &__actions {
    margin-top: 50px;
    display: flex;
    align-items: center;
  }
}
.welcome {
  font-size: 24px;
  margin-top: 70px;
  margin-bottom: 10px;
}
.container-sub-card {
  display: flex;
  justify-content: space-between;
  padding-top: 5%;
}
.sub-card {
  /* White */
  /* Greys/Senary */

  border: 1px solid #e2e9e6;
  border-radius: 7px !important;
  padding: 24px;
  gap: 8px;

  width: 31%;
  height: 240px;
  font-size: 15px;
}
a {
  color: white;
}
.long-card {
  padding: 40px 32px 30px 32px;
  height: 340px;
}
.d-none {
  display: none !important;
}
.d-block {
  display: block !important;
}
.active {
  border: 1px solid #6ece8a !important;
}
</style>
