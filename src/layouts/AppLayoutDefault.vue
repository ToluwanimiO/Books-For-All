<template>
  <header class="container-fluid sticky bg-white z-50 pb-2 top-0 text-center mb-0">
    <nav class="hidden md:flex justify-content-between pt-3 px-5 is-align-center">
      <router-link :to="{ name: 'landing' }">
        <img
          src="../assets/transparent-image.png"
          width="120px"
          alt="Logo"
          srcset=""
        />
      </router-link>
      <!-- <div class="w-full border-b-green-500 border-b-1 mx-12"></div> -->
      <div>
        <router-link :to="{ name: 'landing' }" class="boxed mr-4">Home</router-link>
        <router-link :to="{ name: 'donate' }" class="boxed mr-4">Donate Books</router-link>
        <router-link :to="{ name: 'contact' }" class="boxed mer-4">Contact</router-link>
      </div>
      <div class="w-fit flex">
        <el-button type="plain"
          ><router-link :to="{ name: 'login' }">Login</router-link>
        </el-button>
        <el-button type="primary"
          ><router-link :to="{ name: 'register' }"
            >Create an account
          </router-link></el-button
        >
      </div>
    </nav>
    <nav class="md:hidden p-2">Mobile</nav>
  </header>
  <main class="p-5">
    <slot />
  </main>
  <footer class="container-fluid text-center p-3">
    <p>© 2024 Books for All. All rights reserved.</p>
  </footer>
</template>

<script lang="ts" setup></script>
