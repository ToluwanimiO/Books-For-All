<template>
  <el-button class="my-0 mx-0" type="text" key="plain" @click="action?router.back():stay()">
    <el-icon color="#000">
      <arrow-left />
    </el-icon>
    <span class="font-md ml-1 text-grey-primary">Back</span>
  </el-button>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
defineProps({
  action: {
    type: Boolean,
    default: true,
  },
});
const router = useRouter();
const stay = () =>{
  
}
</script>
