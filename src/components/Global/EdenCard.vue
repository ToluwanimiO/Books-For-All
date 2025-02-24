<template>
  <el-card :class="{boxCard :position === 1, boxCard2:position>1}" class="text-center" :style="{ borderRadius: '16px' }">
    <router-link
      class="info-text"
      :to="{
        name: backTo,
        params: params,
      }"
    >
      <div class="text-left" v-if="position >= 3">Back</div>
    </router-link>
    <div class="progress-container">
      <span
        v-for="i in 7"
        :key="i"
        class="progress"
        :class="{ completed: i <= position || (i == 7 && position == 7)  }"
      >
      </span>
    </div>
    <div class="card-header">
      <h6 class="mb-20">{{ headerText }}</h6>
    </div>
    <div class="card-body mt-40">
      <p class="font-lg">{{ bodyText }}</p>
      <el-button
        @click="completeOnboarding"
        :loading="loading"
        type="primary"
        class="mt-40 go-btn"
      >
        {{ btnText }}
      </el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { updateOnboarding } from "@/requests/onboarding";
import { useAuthStore } from "@/store/auth";
import { computed, onMounted,ref } from "vue";
import { useRoute,useRouter } from "vue-router";
const router = useRouter()
const authStore = useAuthStore();

const props = defineProps({
  headerText: {
    type: String,
    default: "",
  },
  bodyText: {
    type: String,
    default: "",
  },
  btnText: {
    type: String,
    default: "",
  },
  position: {
    type: Number,
    default: 1,
  },
  routeTo: {
    type: String,
    default: "",
  },
  backTo: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const loading = ref(false)
onMounted(() => {
  console.log(route);
  localStorage.setItem(
    "books-for-all-onboarding-position",
    `${props.position}`,
  );
});

const params = computed(() =>
  props.position === 3 ? { view: "dashboard" } : {},
);

const emit = defineEmits(["dashboard"]);

const completeOnboarding = () => {
  loading.value = false
  if (props.position === 1) {
    emit("dashboard");
  }
  if (props.position != 7) {
    router.push({name:props.routeTo})
    loading.value = true
    return;
  }
  loading.value = true
  updateOnboarding()
    .then((response) => {
      if (response.data.status) {
        authStore.user.onboarded_to_eden_business = true;
        let user = JSON.parse(
          localStorage.getItem("books-for-all-user") as string,
        );
        user.onboarded_to_eden_business = 1;
        localStorage.setItem("books-for-all-user", JSON.stringify(user));
        router.push({name:props.routeTo})
      }
    })
    .catch((error) => {
      console.log(error);
      // App.$message.error("Something went wrong");
    });
};
</script>

<style scoped>
.card-body > a {
  color: white !important;
}
.go-btn {
  height: 58;
  width: 203px;
}
.progress {
  width: 45px;
  height: 6px;

  /* Greys/Septenary */

  background: #f0f4f2;
  border-radius: 4px;
}
.progress-container {
  align-content: center;
  text-align: center;
  justify-content: space-between;
  display: flex;
  padding: 10% 2% 10% 2%;
}
.isActive {
  background: linear-gradient(
    to right,
    #03a84e 0%,
    #03a84e 50%,
    #f0f4f2 50%,
    #f0f4f2 100%
  );
}
.completed {
  background: #03a84e;
}
.boxCard2 {
  position: absolute;
  top: 20%;
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  border-radius: 32px;
  width: 42%;
  padding: 8px 50px 15px 50px;
}
</style>
