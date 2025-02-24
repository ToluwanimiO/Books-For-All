<template>
  <el-dialog v-model="shouldShow" @close="state === 'paid'?goToDashboard():closeEvent" class="success">
    <div>
      <div class="gh-container--dialog__header" style="padding:20px 50px 30px">
        <div>
          <img
            :src="getImage(successState?'thumbs_up.svg':state === 'pay'?'pray.svg':state === 'paid'?'star.svg':'sad.svg')"
            class="key-image"
            alt="Eden"
          />
        </div>
        <h2 class="header mt-10">{{titleText}}</h2>
        <div class="sub-head">
          <div style="font-size:16px">
            {{bodyText}}</div
          >
        </div>
        <el-button
          @click="successState?updateSuccess():state === 'pay'?pay():state==='paid'?goToDashboard():tryAgain()"
          type="primary"
          class="mt-40 go-btn"
        >
          {{btnText}}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>


<script>
import useImage from "@/composables/image";


const { getImage } = useImage();

export default {
  name: "EdenStatusModal",
  // components: {PausesModal},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    state:{
      default:'success'
    },
    subscription:{
      type:Array,
      required:true
    },
    id:{
      type:Number
    },
    titleText:'',
    bodyText:'',
    btnText:''
  },
  data() {
    return {
      showModal:false
    };
  },
  computed: {
    shouldShow: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update", value);
      },
    },
    successState(){
      return this.state === 'success' ? true :false 
    }
  },
  methods: {
    getImage,
    closeEvent() {
      this.shouldShow = false;
    },
    tryAgain(){
      console.log(this.successState)
      this.showModal = true
      this.$emit("tryAgain")
      this.closeEvent()
    },
    pay(){

    },
    goToDashboard(){
      this.$router.push({ name: 'subscriptions.details', params:{id:this.id} });
    },
    updateSuccess(){
      this.$emit("success")
      this.closeEvent()
    }
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/mixins";
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
.go-btn {
  height: 65;
  width: 100%;
}
</style>

