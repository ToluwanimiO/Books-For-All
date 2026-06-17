<template>
  <div class="eden-error">
    <h1>Page Not Found</h1>
    <h3>This page you are looking for does not exist.</h3>
    <div class="eden-error__actions">
      <el-button type="outline" @click="goBack">Go back</el-button>
      <el-button type="primary" @click="goHome">Go Home</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  computed: {
    // role() {
    //   return this.$store.getters.user_role;
    // },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      // const role = this.$store.getters.user_role;
      // if (role) {
      //   if (["steward", "ofa"].includes(this.role)) {
      //     this.$router.push({ name: "production-provisions.index" });
      //   } else {
      //     this.$router.push({ name: "customers.index" });
      //   }
      // } else {
      //   this.$router.push({ name: "login" });
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.eden-error {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // h1 {
  //   font-size: 3.5rem;
  //   color: #21312a;
  //   margin-bottom: 20px;
  //   line-height: 0.6;
  //   text-transform: uppercase;
  // }

  h3 {
    font-size: 2rem;
  }

  &__actions {
    margin-top: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
