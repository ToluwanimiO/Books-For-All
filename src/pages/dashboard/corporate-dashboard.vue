<template>
  <eden-page-header title="Corporate Dashboard" style="border:0px">
      <template v-if="false" #actions>
          <el-button class="text-primary">See October Monthly Wrap-up</el-button>
      </template>
  </eden-page-header>
  <div v-if="loading">Loading...</div>
  <div :class="{'d-none':loading}">
    <el-tabs v-if="overview!=null && overview.total_hours_saved.subscriptions.length>1"  v-model="activeTab" class="mt--20" >
        <el-tab-pane label="All Subscriptions" name="allSubscriptions">
        <all-subscriptions :activities='activities'  :overview="overview" @filter="getDashboardOverview($event)"/>
        </el-tab-pane>
        <el-tab-pane v-for="(subscription,index) in overview.total_hours_saved.subscriptions" :key="index" :label="subscription.subscription.name!= null?subscription.subscription.name+' Subscription':'Subscription'" :name="index">
         <individual-subscriptions @updateName="updateName($event,index)" :activities='activities' :show="activeTab === index" :overview="subscription"/>
        </el-tab-pane>
    </el-tabs>
    <div v-else-if=" overview!=null && overview.total_hours_saved.subscriptions.length === 1" >
      <div style="margin:-30px -20px 60px -20px ; border-bottom:1px solid #E2E9E6;padding-bottom:20px; font-weight:500 ">{{overview.total_hours_saved.subscriptions[0].subscription.name!= null?overview.total_hours_saved.subscriptions[0].subscription.name+' subscription':'Subscription'}}</div>
       <individual-subscriptions :overview="overview.total_hours_saved.subscriptions[0]"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../../store/auth";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dashboardRequest from "@/requests/dashboard"; 
import { ElMessage } from "element-plus";
import EdenPageHeader from "@/components/Global/EdenPageHeader.vue";
import AllSubscriptions from "@/components/Dashboard/AllSubscriptions.vue"
import IndividualSubscriptions from "@/components/Dashboard/IndividualSubscriptions.vue"
import useDate from "@/composables/date";

const {  formatPeriodDate } = useDate();
const authStore = useAuthStore();
const activeTab =ref<any>("allSubscriptions")
const route = useRoute();
const router = useRouter();

const loading = ref(false);
const activeCard = ref(true);

const onboarding = computed(() => authStore.onboarding);
const user = computed(() => authStore.authProfile);
const subscriptions=ref(['C-suite','Entry level','Executive','PM','Mid-level','Business'])

const companyProfile = computed(() => authStore.companyProfile);

const goBack = () => {
  router.back();
};

const setActiveCard = () => {
  activeCard.value = !activeCard.value;
};

const goHome = () => {
  // const role = this.$store.getters.user_role;

  // if (role) {
  //   if (["steward", "ofa"].includes(this.role)) {
  //     this.$router.push({ name: "production-provisions.index" });
  //   } else {
  //     this.$router.push({ name: "customers.index" });
  //   }
  // } else {
  router.push({ name: "login" });
  // }
};
const updateName = (event:any,index:any)=>{
  overview.value.total_hours_saved.subscriptions[index].subscription.name = event
  // alert(event)
}
const overview = ref()
const activities = ref()
const getDashboardOverview = (dateRange:any)=>{
  loading.value = true
  console.log(dateRange)
   let range = dateRange.start ? dateRange: dateRange?{start:dateRange,end:dateRange}:{start:'all',end:'all'}
  let period =  dateRange?`?start_date=${range.start}&end_date=${range.end}`:'';
  getActivityFeed(`end_date=${range.end}`)
  dashboardRequest.getDashboardOverview(period)
  .then((response)=>{
    loading.value = false
    console.log(response)
    overview.value = response.data.data
  })
  .catch((error)=>{
    console.log(error)
    loading.value = false
  })
}
const getActivityFeed =(endDate='')=>{
  dashboardRequest.getActivityFeed(`${endDate?`/?${endDate}`:''}`)
  .then((response)=>{
    loading.value = false
    console.log(response.data.data )
    activities.value = response.data.data
  })
  .catch((error)=>{
    console.log(error)
    loading.value = false
  })
}
onMounted(() => {
  console.log(route);
  let dateRange = 
  getDashboardOverview(formatPeriodDate('last7', 'y-m-d'))
});
</script>

<style scoped lang="scss">
.eden-error {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3.5rem;
    color: #21312a;
    margin-bottom: 20px;
    line-height: 0.6;
    text-transform: uppercase;
  }

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
.active{
  border: 1px solid #6ECE8A !important;
}
</style>
