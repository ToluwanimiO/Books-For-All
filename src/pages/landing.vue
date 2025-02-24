<template>
  <div class="text-center">
    <img src="../assets/logo.svg" alt="" srcset="" />
    <div class="row justify-content-center mx-auto text-center">
      <div class="font-28 fw-bold col-md-6">
        Welcome to BooksForAll! Your gateway to equitable book access.
      </div>
    </div>
    <div class="row justify-content-center mx-auto text-center">
      <div class="col-md-4 boxed mt-4">I’m a Student</div>
    </div>
    <div class="row justify-content-center mx-auto text-center">
      <div class="col-md-4 boxed mt-4">I’m a Donor</div>
    </div>
    <div class="row justify-content-center mx-auto text-center">
      <div class="col-md-4 boxed mt-4">We're a school</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",

  data() {
    return {};
  },
  mounted() { },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.boxed {
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}
.boxed:hover {
  background-color: #fafffc;
  border: 1px solid #6ece8a;
}
</style>
