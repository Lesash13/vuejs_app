<template>
  <div>
    <vue-app-loading v-if="isLoading"/>
    <vue-app-error-message v-if="error"/>
    <div v-if="popularTags" class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
            v-for="popularTag in popularTags" :key="popularTag" :to="{name: 'tag', params: {slug: popularTag}}"
            class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import VueAppLoading from "@/components/Loading.vue";
import VueAppErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: 'VueAppPopularTags',
  components: {
    VueAppErrorMessage,
    VueAppLoading,
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }
}
</script>
