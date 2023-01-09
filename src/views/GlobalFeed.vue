<template>
  <div class="home-page">
    <vue-app-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <vue-app-feed-toggler/>
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
import VueAppPopularTags from '@/components/PopularTags.vue'
import VueAppBanner from '@/components/Banner.vue'
import VueAppFeedToggler from '@/components/FeedToggler'
import VueAppFeed from '@/components/Feed.vue'

export default {
  name: 'VueAppGlobalFeed',
  components: {
    VueAppFeed,
    VueAppPopularTags,
    VueAppBanner,
    VueAppFeedToggler
  },
  data() {
    return {
      apiUrl: '/articles'
    }
  }
}
</script>
