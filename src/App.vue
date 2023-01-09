<template>
  <div id="app">
    <vue-app-topbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/auth'
import VueAppTopbar from "@/components/Topbar.vue";

export default {
  name: 'VueApp',
  components: {
    VueAppTopbar
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>


