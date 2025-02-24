<template>
  <content-loader viewBox="0 0 350 12" v-if="type === 'header'">
    <!-- <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />  -->
    <rect x="0" y="5" rx="3" ry="3" width="52" height="35%" /> 
    <!-- <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />  -->
  </content-loader>
  <content-loader viewBox="0 0 500 250"  primaryColor="#F0F4F2" v-if="type === 'overview-box'">
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="0" /> 
    <rect x="0" y="249" rx="3" ry="3" width="100%" height="0" /> 
    <rect x="0" y="0" rx="3" ry="3" width="0" height="100%" /> 
    <rect x="499" y="0" rx="3" ry="3" width="0" height="100%" /> 
    <rect x="30" y="30" rx="9" ry="5" width="170" height="14" /> 
    <circle cx="75" cy="120" r="40" />
  </content-loader>
  <content-loader viewBox="0 0 500 250" primaryColor="#F0F4F2" v-if="type === 'overview-box2'">
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="0" /> 
    <rect x="0" y="249" rx="3" ry="3" width="100%" height="0" /> 
    <rect x="0" y="0" rx="3" ry="3" width="0" height="100%" /> 
    <rect x="499" y="0" rx="3" ry="3" width="0" height="100%" /> 
    <rect x="30" y="0" rx="10" ry="30" width="170" height="20" /> 
    <rect x="30" y="50" rx="7" ry="5" width="90%" height="50" /> 
    <rect x="30" y="120" rx="7" ry="5" width="90%" height="50" /> 
    <rect x="30" y="190" rx="7" ry="5" width="90%" height="50" /> 
  </content-loader>
  <content-loader primaryColor="#CBD8D2" v-if="type === 'overview2'">
    <!-- <rect x="48" y="23" rx="3" ry="3" width="88" height="6" />  -->
    <!-- <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />  -->
    <!-- <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />  -->
    <rect x="0" y="-2" rx="3" ry="3" width="50" height="6" /> 
   
    <circle cx="22" cy="35" r="20" />
  </content-loader>
  <content-loader viewBox="0 0 500 8" v-if="type === 'table-head'">
    <rect x="0" y="0" rx="3" ry="3" width="88" height="100%" /> 
    <rect x="330" y="0" rx="3" ry="3" width="50" height="100%" /> 
    <rect x="390" y="0" rx="3" ry="3" width="50" height="100%" /> 
    <rect x="450" y="0" rx="3" ry="3" width="50" height="100%" /> 
  </content-loader>
  <content-loader viewBox="0 0 500 75" primaryColor="#F0F4F2" v-if="type === 'table'">
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="0" /> 
    <rect x="0" y="75" rx="3" ry="3" width="100%" height="0" /> 
    <rect x="0" y="0" rx="3" ry="3" width="0" height="100%" /> 
    <rect x="500" y="0" rx="3" ry="3" width="0" height="100%" /> 
    <rect x="8" y="15" rx="5" ry="30" width="100" height="10" /> 
    <rect x="8" y="35" rx="5" ry="30" width="100" height="10" /> 
    <rect x="8" y="55" rx="5" ry="30" width="100" height="10" /> 
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name:"EdenContentLoader",
  components: {
    ContentLoader,
  },
  props: {
    type: String,
  }
}
</script>