<template>
  <eden-page-header :title="loading ? '' : 'Dashboard'" />
  <el-row :gutter="15">
    <el-col :md="12">
      <eden-container class="text-center p-10">
        <div class="page-stat">
          <!-- <div class="page-stat--body" style="width: 100%"> -->
          <!-- <div style="margin: auto" class="page-stat--card"> -->
          <div class="stat">
            <div class="stat-figure">
              <h1 class="text-bold">{{ 1460 }}</h1>
            </div>
            <div class="stat-description font-sm text-grey-tertiary">
              Total books distributed
            </div>
            <!-- </div> -->
          </div>
          <!-- </div> -->
        </div>
      </eden-container>
    </el-col>
    <el-col :md="12">
      <eden-container style="min-height: 100%;" class="d-flex align-items-center card-info">
        <div class="d-flex align-items-center">
          <i class="eden-icon-alert-circle me-2" style="color:#ff9d00"></i>
          <div>
            <div>Disclaimer:<br />The books provided through this platform are <span class="fw-bold">strictly for
                educational purposes</span> and must not
              be
              <span class="fw-bold">sold, purchased, or exchanged for money</span> under any circumstances.
              If you notice any attempts to sell or monetize donated books, please report the violation immediately
              using
              the button below.
            </div>
            <el-button type="danger mt-2" @click="reportViolation()">Report Violations
            </el-button>
          </div>
        </div>
      </eden-container>
    </el-col>
  </el-row>
  <el-row class="d-flex align-items-stretch" :gutter="15">
    <el-col :md="12">
      <eden-container style="min-height: 100%;">
        <p class="text-bold">Top 3 Donors</p>
        <el-row class="mt-4 " v-for="(donor, index) in donors" :key="index">
          <el-col :md="12">
            <span class="text-grey-tertiary mr-3">{{ donor.name }}</span>
            {{ donor.books_donated }}/{{ total_books_donated }}</el-col>
          <el-col :md="12">
            <el-progress :class="index === 0 ? 'food' : index === 1 ? 'cleaning' : 'beauty'
              " :percentage="(donor.books_donated / total_books_donated) * 100" :stroke-width="18">
              <span style="color: transparent">c</span>
            </el-progress>
          </el-col>
        </el-row>
      </eden-container>
    </el-col>
    <el-col :md="12">
      <eden-container>
        <div class="card-container">
          <RouterLink class="is-flex justify-between align-center" :to="{
            name: 'partner-schools',
          }">
            <div class="">
              <div>Active Partner Schools</div>
              <div class="text-bold big-num">300</div>
            </div>
            <span class="is-flex">
              <p class="text-grey-tertiary">
                Become A Partner School
              </p>
              <span class="icon-position eden-icon-arrow-right"></span>
            </span>
          </RouterLink>
        </div>
        <div class="card-container">
          <RouterLink class="is-flex justify-between align-center" :to="{
            name: 'find-book',
          }">
            <div class="">
              <div>Books Available</div>
              <div class="text-bold big-num">1,700</div>
            </div>
            <span class="is-flex">
              <p class="text-grey-tertiary">
                Find A Book
              </p>
              <span class="icon-position eden-icon-arrow-right"></span>
            </span>
          </RouterLink>
        </div>
      </eden-container>
    </el-col>
  </el-row>
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
const total_books_donated = 670;
const donors = [
  { name: "Toluwanimi Osuolale", books_donated: 389 },
  { name: "Anonymous ", books_donated: 100 },
  { name: "Felicia O. ", books_donated: 78 },
];
const route = useRoute();
const router = useRouter();

const loading = ref(false);
const activeCard = ref(true);
const reportViolation = () => {
  if(user.value.email == "") {
    ElMessage.error("Please sign up to report a violation");
    return router.push({ name: 'register' });
  }
  router.push({ name: 'report-violation' });
};
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

onMounted(() => { });
</script>

<style scoped lang="scss">
.card-container {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--eden-grey-septenary);

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

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

.page-stat {
  margin: 50px 0 50px;
  flex-wrap: wrap;
  width: 100%;
  padding: 30px 10px;
  transition: all 0.3s ease-in-out;

  .stat {
    &-figure {
      align-items: center;
      color: var(--eden-grey-primary);
      margin-bottom: 7px;
      position: relative;

      h5 {
        &.small {
          font-size: 1.75rem;
          text-align: center;
        }
      }

      .stat-expand {
        cursor: pointer;
        position: absolute;
        opacity: 0;
        right: 25%;
        top: 10%;
      }

      span {
        font-size: 14px;
        line-height: 15.24px;

        &.stat-increase {
          color: #14b757;
        }

        &.stat-decrease {
          color: #f40529;
        }
      }
    }

    &-description {
      color: #4b6358;

      .body-text {
        font-weight: 400;
      }
    }
  }

  @media (max-width: 756px) {
    margin: 20px;
  }
}

.big-num {
  font-size: 24px;
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
