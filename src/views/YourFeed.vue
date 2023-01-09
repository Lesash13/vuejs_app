<template>
  <div class="home-page">
    <vue-app-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <vue-app-toggler/>
          <vue-app-feed :api-url="apiUrl"></vue-app-feed>
        </div>
        <div class="col-md-3">
          <vue-app-popular-tags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueAppFeed from '@/components/Feed.vue'
import VueAppPopularTags from '@/components/PopularTags.vue'
import VueAppBanner from '@/components/Banner.vue'
import VueAppToggler from "@/components/FeedToggler.vue";

export default {
  name: 'VueAppYourFeed',
  components: {
    VueAppPopularTags,
    VueAppFeed,
    VueAppToggler,
    VueAppBanner
  },
  data() {
    return {
      apiUrl: '/articles/feed'
    }
  }
}
</script>
