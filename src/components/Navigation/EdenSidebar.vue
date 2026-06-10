<template>
  <div>
    <div class="eden-crm--sidebar">
      <div v-if="user" class="user">
        <div class="user-info">
          <!-- <eden-avatar :src="'avatar.svg'" :size="26" /> -->
          <img :src="getImage('avatar.svg')" style="margin-left: 6px" />
          <div class="user-info--name">
            <div>{{ fullName }}</div>
            <div class="cutText fw-bold mt-0">{{ user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""
            }}</div>
          </div>
        </div>
        <el-dropdown popper-class="logout" :popper-options="{
          modifiers: [
            { name: 'offset', options: { offset: [-80, 25] } },
            {
              name: 'arrow',
              options: {
                padding: 500, // 5px from the edges of the popper
              },
            },
          ],
        }">
          <span class="el-dropdown-link">
            <el-icon class="eden-icon-arrow-down">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="logout">
              <el-dropdown-item class="text-red-primary" icon="eden-icon-logout" @click="logout">
                <i class="text-red-primary eden-icon-logout"></i>Log
                out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else class="user">
        <div class="user-info--name">
          <div>Access account</div>
        </div>
        <el-dropdown popper-class="logout" :popper-options="{
          modifiers: [
            { name: 'offset', options: { offset: [-80, 25] } },
            {
              name: 'arrow',
              options: {
                padding: 500, // 5px from the edges of the popper
              },
            },
          ],
        }">
          <span class="el-dropdown-link">
            <el-icon class="eden-icon-arrow-down">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="logout">
              <el-dropdown-item class="text-success" icon="eden-icon-logout" @click="routeUser('login')">
                <!-- <i class="text-red-primary eden-icon-logout"></i> -->
                Log in</el-dropdown-item>
              <el-dropdown-item class="text-success" icon="eden-icon-logout" @click="routeUser('register')">
                <!-- <i class="text-red-primary eden-icon-logout"></i> -->
                Register</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="sidebar-routes">
        <el-menu :default-active="nav" :router="true">
          <template v-for="(route, index) in navRoutes">
            <template v-if="!route.sub_routes">
              <el-menu-item v-if="route.access.includes(user.role) || (route.access.includes('all') && user.role == '')"
                :key="index" :index="route.name" :route="{
                  name: `${route.name}`,
                }">
                <span class="icon">
                  <i :class="`${route.icon}`"></i>
                </span>
                <span>{{ route.label }}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu class="el-submenu__sidenav" :key="index" :index="route.name" :disabled="!route.active">
                <template>
                  <span class="icon"><i :class="`eden-icon-${route.icon}`"></i></span>
                  <span> {{ route.label }} </span>
                </template>
                <el-menu-item v-for="(sub_route, index) in route.sub_routes" :key="index"
                  :index="sub_route.name.split('.')[1]" :route="{ name: `${sub_route.name}.index` }"
                  :disabled="!sub_route.active" @click="closeSidebar">
                  {{ sub_route.label }}
                </el-menu-item>
              </el-submenu>
            </template>
          </template>
        </el-menu>
      </div>
      <!-- <div @click="emit('chat')" class="text-bold text-primary chat-text is-flex text-cursor">
        <i class="eden-chat-bubble mr-1"></i>Chat with a gardener
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navRoutes as navItems } from "@/components/Navigation/sidenav-routes";
import useImage from "@/composables/image";
import { useAuthStore } from "@/store/auth";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const { getImage } = useImage();
const emit = defineEmits(["chat"]);
const store = useAuthStore();

const route = useRoute();
const router = useRouter();

const navRoutes = navItems();
const nav = ref("dashboard");
const user = computed(() => store.authProfile);

const fullName = computed(() => {
  console.log(user.value);
  if (user.value == null || !Object.keys(user.value).length) {
    return "";
  }
  
  return `${user.value?.first_name} ${user.value?.last_name}`;
});

const onboarding = computed(() => store.onboarding);

const onboardingAcess = computed(() => ({
  dashboard: true,
  subscriptions: true,
  employees: true,
  // "one-off-orders": onboarding.value,
  payment: true,
  "resource-center": onboarding.value,
  settings: true,
  guide: true,
}));

const logout = () => {
  store.logOut();
  router.push({ name: "login" });
};
const routeUser = (route: any) => {
  router.push({ name: route });
};

const closeSidebar = () => { };

const setNav = () => {
  console.log(route)
  nav.value = route.name as string;
  console.log(nav.value);
};

onMounted(() => {
  setNav();
});

watch(
  () => route.meta.module,
  () => {
    setNav();
  }
);
</script>

<style lang="scss" scoped>
.logout {
  width: 186px !important;
}

.cutText {
  white-space: nowrap;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1d352a;
}

.user-info {
  height: 32px;
  width: 32px;
  border-radius: 50%;

  /* Orange/Septenary */

  background: #fff3df;
}

.eden-crm--sidebar {
  background: var(--eden-sidenav);
  height: 100vh;
  transition: width 0.3s ease-in-out;
  width: 100%;
  padding: 12px;
  position: relative;

  // overflow-y: scroll;
  .user {
    background: #ffffff;
    border: 1px solid #e2e9e6;
    border-radius: 8px;
    width: 100%;
    padding: 12px 5px 12px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #1d352a;

      &--name {
        margin-left: 10px;
        font-size: 0.75rem;
        color: var(--eden-grey-secondary);

        p {
          font-weight: 500;
          line-height: 1.5;
        }

        span {
          font-weight: 400;
          opacity: 0.74;
          width: 3px !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
      }
    }
  }

  .sidebar-routes {
    height: 70vh;
    // overflow-y: scroll;
  }

  .el-menu {
    border: none;
    background: none;
    margin-top: 16px;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    background: var(--eden-sidenav);

    .el-menu-item {
      border-radius: 8px;
      background: var(--eden-sidenav);
      color: var(--eden-grey-tertiary);
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      font-weight: 500;
      height: 38px;
      line-height: 20px;
      padding: 14px 0 14px 12px !important;
      transition: all 0.25s ease-in-out;

      .icon {
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 14px;

        i {
          color: var(--eden-grey-tertiary);
          font-size: 1.125rem;
          transition: color 0.25s ease-in-out;
        }
      }

      &.is-active {
        color: #ffffff;
        background: var(--eden-green-primary);
        transition: all 0.25s ease-in-out;

        i {
          color: #ffffff !important;
          transition: color 0.25s ease-in-out;
        }
      }

      &.is-disabled {
        opacity: 0.6;
      }

      &:hover:not(.is-active) {
        background: #bdeecd60;
        color: var(--eden-green-primary);

        i {
          color: var(--eden-green-primary);
        }
      }
    }
  }

  .el-submenu {
    background: var(--eden-sidenav) !important;

    &__title {
      i {
        font-size: 1.125rem;
      }
    }

    .el-menu {
      background-color: var(--eden-sidenav) !important;
    }

    .el-menu-item {
      background: var(--eden-sidenav) !important;
      padding-left: 40px !important;

      &:hover {
        background: var(--eden-sidenav) !important;
      }

      &.is-active {
        background: var(--eden-green-senary) !important;
        color: var(--eden-green-primary);
      }
    }
  }

  .sidebar-calculator-cta {
    height: 36px;
    width: 36px;
    border-radius: 100px;
    background: rgba(3, 168, 78, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    overflow: hidden;

    img {
      height: 16px;
      width: auto;
    }
  }
}

.chat-text {
  border: 1px solid #98dcaf;
  border-radius: 12px 12px 12px 0px;
  padding: 10px;
}
</style>
