<template>
  <div :class="['icon-container', { iconState: showSideBar }]">
    <IconParkOutlineHamburgerButton
      class="ml-2 text-2xl"
      @click="showSideBar = !showSideBar"
    />
  </div>
  <div class="eden-crm">
    <div :class="['eden-crm--sidebar', { open: showSideBar }]">
      <eden-sidebar />
    </div>
    <div class="eden-crm--dashboard">
      <!-- <transition name="fade" mode="out-in" :key="$route.fullPath"> -->
      <div class="h-100">
        <slot />
      </div>
      <!-- </transition> -->
    </div>
    <!-- <transition name="overlay-fade" mode="out-in">
      <div
        v-if="sidebarOpen"
        class="overlay"
        @click="sidebarOpen = false"
      ></div>
    </transition> -->
  </div>
</template>

<script lang="ts" setup>
import EdenSidebar from '@/components/Navigation/EdenSidebar.vue'
import IconParkOutlineHamburgerButton from '~icons/icon-park-outline/hamburger-button'
import { ref } from 'vue'
const showSideBar = ref(true)
</script>

<style lang="scss" scoped>
.icon-container {
  // background: var(--eden-sidenav);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 8px 0px;
  display: block;
}
.iconState {
  background: var(--eden-sidenav);
  transition: background-color 0.25s ease-out;
}
.eden-crm {
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;

  &--sidebar {
    height: 100vh;
    width: var(--sidenav-width);
  }

  &--dashboard {
    height: 100vh;
    width: calc(100% - #{var(--sidenav-width)});
    padding: 30px;
    background: #ffffff;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;

    &::-webkit-scrollbar {
      width: 5px;
      position: absolute;
      right: 0;
    }

    &::-webkit-scrollbar-track {
      background: #ccc;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--eden-green-primary);
      border-radius: 8px;
    }

    &__impersonation {
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      max-width: 100% !important;
      background-color: #fff8e1;
      color: #0f241b;
      padding: 5px 10px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      .el-button {
        margin-left: 12px;
      }

      + div {
        padding-top: 30px;
      }
    }
    > * {
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  &--sidebar-toggle {
    position: fixed;
    z-index: 10;
    right: 30px;
    bottom: 30px;
    height: 48px;
    width: 48px;
    border-radius: 100px;
    background: var(--eden-green-primary);
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
      color: #ffffff;
      font-weight: 600;
      font-size: 1.125rem;
    }
  }

  @media (max-width: 767px) {
    &--sidebar {
      position: absolute;
      left: -100vw;
      z-index: 12;
      transition: left 0.25s ease-out;

      &.open {
        left: 0;
        transition: left 0.25s ease-in;
      }

      &-toggle {
        display: flex;
      }
    }

    &--dashboard {
      width: 100%;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.25s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11;

  &-fade-enter-active,
  &-fade-leave-active {
    transition-duration: 0.4s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  &-fade-enter,
  &-fade-leave-active {
    opacity: 0;
  }
}
.container {
  position: relative;
}
@media (min-width: 768px) {
  .icon-container{
    display: none;
  }
}
</style>
