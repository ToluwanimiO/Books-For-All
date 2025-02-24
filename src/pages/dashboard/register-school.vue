<template>
  <eden-page-header :title="loading ? '' : 'Register New School'" />
  <div>Register New School</div>
</template>

<script lang="ts" setup>
import { verifyAccount } from "../../requests/auth";
import { useAuthStore } from "../../store/auth";
import EdenContentLoader from "../../components/Global/EdenContentLoader.vue";
import EdenCard from "../../components/Global/EdenCard.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
// import EdenPageHeader from "@/components/Global/EdenPageHeader.vue";
import { getSubscriptions } from "@/requests/subscriptions";
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const activeCard = ref(true);

const onboarding = computed(() => authStore.onboarding);
const user = computed(() => authStore.authProfile);

const fullName = computed(() => {
  console.log(user);
  if (user.value.first_name == null) {
    return "";
  }
  let fname =
    user.value.first_name && user.value.first_name != null
      ? user.value.first_name
      : "";
  return fname;
});

const companyProfile = computed(() => authStore.companyProfile);

const goBack = () => {
  router.back();
};
const subscriptions = ref([]);
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

onMounted(() => {});
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
.active {
  border: 1px solid #6ece8a !important;
}
</style>
