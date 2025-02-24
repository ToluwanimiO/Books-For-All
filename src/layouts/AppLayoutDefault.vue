<template>
  <div>
    <div class="container-fluid text-center mb-0">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-between p-3">
            <span class="text-cta home"><router-link :to="{ name: 'landing' }">Home</router-link></span>
            <div>
              <el-button type="plain"><router-link :to="{ name: 'login' }">Login</router-link>
                <!-- <i class="eden-icon-arrow-down ms-2"></i> -->
              </el-button>
              <el-button type="primary"><router-link :to="{ name: 'register' }">Create an account
                  <!-- <i class="eden-icon-arrow-down ms-2"></i> -->
                </router-link></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.home {
  font-size: 24px;
  text-decoration: none;
  font-family: "Times New Roman", Times, serif;
}
</style>
