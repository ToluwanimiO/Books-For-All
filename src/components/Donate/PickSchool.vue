<template>
  <div class="text-center mb-xl">
    <!-- <h1 class="mb-3 text-4xl font-bold">Select Your Institution</h1>
    <p class="">
      Donations are routed to specific schools to help students in your
      community.
    </p> -->
  </div>
  <!-- Search and Action Container -->
  <div class="rounded-xl mb-4">
    <div class="flex flex-col md:flex-row gap-3 items-center">
      <el-input
        v-model="schoolQuery"
        class=""
        placeholder="Search for a school"
      />
      <el-button class="h-100" type="primary">Find my school</el-button>
    </div>
  </div>
  <div
    class="bg-green-700 p-5 text-shadow-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm"
  >
    <div class="flex items-center gap-2">
      <div class="rounded-lg p-4 bg-white mr-5">
        <MaterialSymbolsLocationOnOutline class="text-green-700 text-2xl" />
      </div>
      <div class="text-green-200">
        <div class="flex items-center gap-2 mb-1">
          <span
            class="bg-green-800 bg-opacity-25 text-green-200 font-bold px-2 py-1 rounded-full text-xs"
            >NEAREST CAMPUS</span
          >
          <span class="text-label-sm font-label-sm opacity-80"
            >• 1.2 miles away</span
          >
        </div>
        <h3 class="text-green-200! text-2xl!">New York University</h3>
        <p class="text-green-200! font-body-md opacity-90">
          Based on your current location in Manhattan, NY
        </p>
      </div>
    </div>
    <el-button class="flex justify-between" @click="selectSchool()">
      <span> Select this school</span>
      <MaterialSymbolsCheckCircleOutline />
    </el-button>
  </div>
  <div class="flex items-center justify-between mb-lg">
    <h2 class="text-2xl! my-3 font-bold">Browse by State</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-4">
    <el-button class="p-10!">
      <div class="rounded-lg p-2 bg-gray-100 mr-5">
        <MaterialSymbolsLocationOnOutline class="text-green-700 text-2xl" />
      </div>
      <div class="text-left">
        <h3 class="text-xl!">Lagos</h3>
        <p class="text-sm text-secondary">15 Schools</p>
      </div>
    </el-button>
    <el-button class="p-10!">
      <div class="rounded-lg p-2 bg-gray-100 mr-5">
        <MaterialSymbolsLocationOnOutline class="text-green-700 text-2xl" />
      </div>
      <div class="text-left">
        <h3 class="text-xl!">Lagos</h3>
        <p class="text-sm text-secondary">15 Schools</p>
      </div> </el-button
    ><el-button class="p-10!">
      <div class="rounded-lg p-2 bg-gray-100 mr-5">
        <MaterialSymbolsLocationOnOutline class="text-green-700 text-2xl" />
      </div>
      <div class="text-left">
        <h3 class="text-xl!">Lagos</h3>
        <p class="text-sm text-secondary">15 Schools</p>
      </div> </el-button
    ><el-button class="p-10!">
      <div class="rounded-lg p-2 bg-gray-100 mr-5">
        <MaterialSymbolsLocationOnOutline class="text-green-700 text-2xl" />
      </div>
      <div class="text-left">
        <h3 class="text-xl!">Lagos</h3>
        <p class="text-sm text-secondary">15 Schools</p>
      </div>
    </el-button>
  </div>
  <div class="my-3 text-center">
    <button
      class="text-primary font-label-md flex items-center justify-center gap-1 hover:underline mx-auto"
    >
      Can't find your school? Invite your school to join
      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import { getAllSchools } from '@/requests/auth'

import MaterialSymbolsCheckCircleOutline from '~icons/material-symbols/check-circle-outline'
import MaterialSymbolsLocationOnOutline from '~icons/material-symbols/location-on-outline'
const schoolQuery = ref(null)

const emit = defineEmits(['schoolSelected'])

const selectSchool = () => {
  emit('schoolSelected', 'Greenwood High School')
}
onMounted(() => {
  // Fetch all Schools
  //   getAllSchools()
  //     .then((response) => {
  //       console.log('Response:', response)
  //       schools.value = response.data
  //     })
  //     .catch((err) => {
  //       console.error('Error:', err)
  //     })
})
</script>
