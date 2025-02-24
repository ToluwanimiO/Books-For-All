<template>
  <el-dialog v-model="shouldShow" @close="closeEvent" class="success">
    <div>
      <div class="gh-container--dialog__header">
        <div class="logo-border">
          <img
            :src="getImage('list_confirmed.svg')"
            class="key-image"
            alt="Eden"
          />
        </div>
        <h2 class="header">You’re now on our list!</h2>
        <div class="sub-head">
          <span
            >You’ve been added to our waitlist for
            <!-- {{ $store.getters.getSuccessProp.state }}. <br /> -->
            You’ll be the first to know when we touch down!</span
          >
        </div>
        <div class="actions">
          <router-link
            :to="{ name: 'login' }"
            class="w-100 margin-top-20 el-button el-button--primary"
            >Okay!
          </router-link>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import useImage from "@/composables/image";

const { getImage } = useImage();

export default {
  name: "NewLocationSuccessDialog",
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    shouldShow: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      },
    },
  },
  methods: {
    getImage,
    closeEvent() {
      this.shouldShow = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/css/mixins";
.el-dialog {
  height: auto;

  &__wrapper {
    margin-top: 1vh !important;
    top: 0;
  }
  .actions {
    display: none;
  }
}
@include respond(md) {
  .success {
    display: flex;
    align-items: flex-end;
  }
  .actions {
    display: block !important;
  }
}
</style>
>
