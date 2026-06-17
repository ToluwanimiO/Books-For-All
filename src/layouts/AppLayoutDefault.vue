<template>
    <header class="container-fluid text-center mb-0">
      <nav class="d-flex justify-content-between pt-3 px-5 is-align-center">
        <router-link :to="{ name: 'landing' }">
          <img src="../assets/transparent-image.png" width="120px" alt="Logo" srcset="" />
        </router-link>
        <div>
          <router-link :to="{ name: 'landing' }" class="boxed mr-4">Home</router-link>
          <router-link :to="{ name: 'about' }" class="boxed mr-4">About</router-link>
          <router-link :to="{ name: 'contact' }" class="boxed mer-4">Contact</router-link>
        </div>
        <div>
          <el-button type="plain"><router-link :to="{ name: 'login' }">Login</router-link>
          </el-button>
          <el-button type="primary"><router-link :to="{ name: 'register' }">Create an account
            </router-link></el-button>
        </div>
      </nav>
    </header>
    <main class="p-5">
      <slot />
    </main>
    <footer class="container-fluid text-center p-3">
      <p>© 2024 Books for All. All rights reserved.</p>
    </footer>
</template>

<script lang="ts" setup></script>

